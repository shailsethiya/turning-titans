
from flask import jsonify,request, abort, session, current_app
from flask_login import login_user, logout_user
from utilities.db_manager.models import User
from . import login_blueprint
from extensions import db, login_manager

@login_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check if data is not None and if 'username' and 'password' are provided
    if not data or 'username' not in data or 'password' not in data:
        abort(400, description="Both username and password must be provided!")

    username = data.get('username')
    password = data.get('password')

    # Check if user already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Username already exists!"}), 400

    # Create a new user and set the password (which hashes it)
    new_user = User(username=username)
    new_user.password = password

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201


@login_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Check if data is not None and if 'username' and 'password' are provided
    if not data or 'username' not in data or 'password' not in data:
        abort(400, description="Both username and password must be provided!")

    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.verify_password(password):
        login_user(user)
        session_name = current_app.config["SESSION_COOKIE_NAME"]
        return jsonify({"message": "Login successful!", "user_id": user.id, 'session_cookie_name': session_name,"session_info": dict(session)}), 200
    return jsonify({"error": "Invalid credentials!"}), 401


@login_blueprint.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully!"}), 200


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)
