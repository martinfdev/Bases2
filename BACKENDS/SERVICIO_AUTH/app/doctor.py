from flask import Blueprint, jsonify, request
from CONFIG.connection import get_db_connection
from CONFIG.decorators import token_required, doctor_required
import bcrypt
import pyodbc
import re
doctor_bp = Blueprint('doctor', __name__)

@doctor_bp.route('/dashboard', methods=['GET']) #dashbord para el administrador
@token_required
@doctor_required
def admin_route(current_user):
    print(current_user)
    return jsonify({"message": f"Welcome doctor, user {current_user['nombres']}!"}), 200