import os

from flask import Flask
from flask_cors import CORS
from extensions import db, login_manager
from utilities.login import login_blueprint
from utilities.proposals import proposals_blueprint
from utilities.db_manager import db_manager_blueprint
import secrets


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = secrets.token_hex(16)
    app.config["SESSION_COOKIE_SECURE"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = 'None'

    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///proposals.db'

    # Initialize extensions
    CORS(app,supports_credentials=True,resources={r"/*":{"origins":"*"}})
    db.init_app(app)
    login_manager.init_app(app)

    # Configure login manager
    login_manager.login_view = "login.login"

    app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), "datasource")

    # Blueprint registrations
    app.register_blueprint(login_blueprint, url_prefix='/auth')
    app.register_blueprint(proposals_blueprint, url_prefix='/api')
    app.register_blueprint(db_manager_blueprint)  # No prefix since this isn't exposing routes

    # Database creation
    with app.app_context():
        db.create_all()

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
