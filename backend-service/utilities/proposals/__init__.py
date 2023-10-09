
from flask import Blueprint

proposals_blueprint = Blueprint('proposals', __name__)

from . import manager
