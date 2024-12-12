from flask import Blueprint, jsonify, request
from CONFIG.connection import get_db_connection_SQLSERVER
from CONFIG.decorators import token_required, enfermera_required
import bcrypt
import pyodbc
import re
enfermera_bp = Blueprint('enfermera', __name__)

@enfermera_bp.route('/dashboard', methods=['GET']) #dashbord para el administrador
@token_required
@enfermera_required
def admin_route(current_user):
    print(current_user)
    return jsonify({"message": f"Welcome enfermera, user {current_user['nombres']}!"}), 200