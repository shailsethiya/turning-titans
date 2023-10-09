
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db
import uuid


class User(db.Model):
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = db.Column(db.String, unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)

    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute.')

    @password.setter
    def password(self, password):
        self._password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self._password, password)

    # The following attributes and methods are for Flask-Login compatibility

    @property
    def is_active(self):
        return True

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)  # make sure it returns a string


class Proposal(db.Model):
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String, nullable=False)
    LTIM_offering = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=True, default='Proposal Pending')
    generated_proposal = db.Column(db.Boolean, default=True)
    created_by = db.Column(db.String, nullable=False)
    created_on = db.Column(db.String, nullable=True)
    additional_info = db.Column(db.String, nullable=True)
    file_path = db.Column(db.String, nullable=True)
