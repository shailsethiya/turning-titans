import os.path
from flask import current_app
from extensions import db
from utilities.db_manager.models import Proposal
from datetime import datetime
import time
from multiprocessing import Process
from run import create_app
from .final_genAI import generate_proposal


def llm_generate_model(filepath_rfp):
    """
    Task 4 and Task 5 Gen AI ####
    Need to create async job which run and update status,generated_proposal and created_on on its completion
    LLM Content creation completed ####
    :param file_path:
    :return:proposal.docx
    # generate_proposal(filepath_rfp,filepath_output):
    """
    filepath_output = os.path.dirname(filepath_rfp)
    print("Proposal File Path:",filepath_output)
    generate_proposal(filepath_rfp,filepath_output)

    time.sleep(20)


def get_task(proposal_id):
    app = create_app()
    with app.app_context():
        proposal = Proposal.query.get(proposal_id)
        try:
            # Simulating a long-running task
            llm_generate_model(proposal.file_path)

            # Update the Proposal once done
            proposal.status = "Proposal Generated"
            proposal.generated_proposal = True
            proposal.created_on = datetime.now()
            db.session.commit()
        except Exception as msg:
            proposal.status = "Failed"
            proposal.generated_proposal = False
            proposal.created_on = datetime.now()
            db.session.commit()
            print(msg)


def async_task(proposal_id):
    try:
        process = Process(target=get_task, args=(proposal_id,))
        process.start()
    except Exception as msg:
        print(msg,"Failed to start the LLM Content generation process")


