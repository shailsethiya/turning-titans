
from flask import jsonify, request, send_from_directory, abort
from pathlib import Path
from flask import current_app
from extensions import db
from flask_login import current_user,login_required
from .job import async_task
from utilities.db_manager.models import Proposal
from datetime import datetime
from . import proposals_blueprint
import os

ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'html'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@proposals_blueprint.route('/list_proposals', methods=['GET'])
def list_proposals():
    proposals = Proposal.query.all()
    data = [{
        "name": proposal.name,
        "LTIM_offering": proposal.LTIM_offering,
        "status": proposal.status,
        "generated_proposal": proposal.generated_proposal,
        "created_by": proposal.created_by,
        "created_on": proposal.created_on,
        "id" : proposal.id
    } for proposal in proposals]
    return jsonify(
        {
            "data":{
                "status":200,
                "list" : data
            }
        }
    ),200


@proposals_blueprint.route('/add_proposal', methods=['POST'])
def add_proposal():
    data = request.form
    file = request.files.get('upload_file')

    if 'name' not in data or 'LTIM_offering' not in data:
        abort(400, description="Both name and LTIM_offering must be provided!")

    proposal = Proposal(
        name=data.get('name'),
        LTIM_offering=data.get('LTIM_offering'),
        additional_info=data.get('additional_info', ''),
        created_by="shailendra@gmail.com",
        created_on=datetime.now(),
        status="In Progress"
    )

    db.session.add(proposal)
    db.session.commit()

    if file and allowed_file(file.filename):
        # Create a directory named after the proposalID
        proposal_dir = Path(current_app.config['UPLOAD_FOLDER']) / str(proposal.id)
        proposal_dir.mkdir(parents=True, exist_ok=True)

        # Save the file in the newly created directory
        filename = proposal_dir / file.filename
        file.save(filename)

        # Update the file_path of the proposal object
        proposal.file_path = str(filename)

        db.session.commit()

    # Launch the asynchronous task
    async_task(proposal.id)

    return jsonify({"message": "Proposal creation request is recieved and is In progress ", "proposal_id": proposal.id}), 201


@proposals_blueprint.route('/delete_proposal/<string:proposal_id>', methods=['DELETE'])
def delete_proposal(proposal_id):
    proposal = Proposal.query.get_or_404(proposal_id)

    # Check if the current user is the owner of the proposal or not
    # if proposal.created_by != current_user.username:
    #     abort(403, description="You do not have permission to delete this proposal")

    # If there's an associated file, delete it
    if proposal.file_path:
        try:
            file_path = Path(proposal.file_path)
            os.remove(file_path)

            # Optionally, remove the directory if it's empty
            directory = file_path.parent
            if not any(directory.iterdir()):  # Check if directory is empty
                directory.rmdir()

        except FileNotFoundError:
            # If file not found, continue with deleting the record
            pass

    db.session.delete(proposal)
    db.session.commit()

    return jsonify({"message": f"Proposal {proposal_id} and its associated files deleted successfully!"}), 200


@proposals_blueprint.route('/download_proposal/<string:proposal_id>', methods=['GET'])
def download_proposal(proposal_id):
    # First, fetch the proposal from the database using the provided proposal_id.
    proposal = Proposal.query.get(proposal_id)
    if proposal is None:
        return jsonify({"error": "Proposal not found!"}), 404

    # Extract the file path from the proposal object.
    file_path = proposal.file_path
    if not file_path:
        return jsonify({"error": "No file associated with this proposal!"}), 404

    # Use send_from_directory to send the file to the client.
    directory = os.path.dirname(file_path)
    return send_from_directory(directory, "proposal.docx", as_attachment=True)

@proposals_blueprint.route('/preview_proposal/<string:proposal_id>', methods=['GET'])
def preview_proposal(proposal_id):
    # First, fetch the proposal from the database using the provided proposal_id.
    proposal = Proposal.query.get(proposal_id)
    if proposal is None:
        return jsonify({"error": "Proposal not found!"}), 404

    # Extract the file path from the proposal object.
    file_path = proposal.file_path
    if not file_path:
        return jsonify({"error": "No file associated with this proposal!"}), 404

    # Use send_from_directory to send the file to the client.
    directory = os.path.dirname(file_path)
    return send_from_directory(directory, "proposal.docx", as_attachment=False)


@proposals_blueprint.route('/proposal_summary/<string:proposal_id>', methods=['GET'])
def summary_proposal(proposal_id):
    # First, fetch the proposal from the database using the provided proposal_id.
    proposal = Proposal.query.get(proposal_id)
    if proposal is None:
        return jsonify({"error": "Proposal not found!"}), 404

    if not proposal.status == "Proposal Generated" :
        return jsonify({"error": "Proposal summary is not yet generated!"}), 404
    
    file_doc_rfp = proposal.file_path
    directory = os.path.dirname(file_doc_rfp)

    # Extract the file path from the proposal object.
    file_path = os.path.join(directory,"proposal.docx")
    if not file_path:
        return jsonify({"error": "No summary file associated with this proposal!"}), 404
    
    from .summarization import summarize
    summary = summarize(filepath=file_path)

    # Use send_from_directory to send the file to the client.
    
    return jsonify({"summary": summary, "proposal_id": proposal.id}), 201