from flask import Blueprint

db_manager_blueprint = Blueprint('db_manager', __name__)

from . import models
