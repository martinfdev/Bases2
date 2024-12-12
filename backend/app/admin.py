from flask import Blueprint, jsonify, request
from app.connection import get_db_connection
from app.decorators import token_required, admin_required
import bcrypt
import pyodbc
import re
admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/dashboard', methods=['GET']) #dashbord para el administrador
@token_required
@admin_required
def admin_route(current_user):
    print(current_user)
    return jsonify({"message": f"Welcome admin, user {current_user['id_usuario']}!"}), 200