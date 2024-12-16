from flask import Blueprint, jsonify, request
from datetime import datetime
import sys
import os
config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
sys.path.append(config_path)
from CONFIG.connection import get_db_connection_SQLSERVER
from CONFIG.decorators import token_required, desarrollador_required
import bcrypt
import pyodbc
import re
from REDIS.logs import save_log_param
desarrollador_bp = Blueprint('desarrolaldor', __name__)


@desarrollador_bp.route('/dashboard', methods=['GET']) #dashbord para el administrador
@token_required
@desarrollador_required
def admin_route(current_user):
    print(current_user)
    return jsonify({"message": f"Welcome desarrollador, user {current_user['id_usuario']}!"}), 200


email_regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
