from flask import Blueprint, request, jsonify, current_app
import re
import bcrypt
import pyodbc
import jwt

from CONFIG.connection import get_db_connection_SQLSERVER
from CONFIG.decorators import token_required
#from REDIS.logs import save_log_param
auth_bp = Blueprint('auth', __name__)
   

@auth_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    if 'identificador' not in data or 'contrasena' not in data:
        return jsonify({"error": "Nombre de usuario/correo y contraseña son requeridos"}), 400
    identificador = data['identificador']  # Puede ser el correo o dpi
    contrasena = data['contrasena']
    conn = get_db_connection_SQLSERVER()
    cursor = conn.cursor()
    cursor.execute(''' 
        SELECT id_usuario, contrasena, id_rol, dpi, id_especialidad, estado 
        FROM Usuario
        WHERE correo = ? OR dpi = ?
    ''', (identificador, identificador))
    user = cursor.fetchone()
    if user and bcrypt.checkpw(contrasena.encode('utf-8'), user[1].encode('utf-8')):
        # Verificar si el estado esta inactivo -> 0
        inactivo= user[5]
        if 0 == inactivo:
            return jsonify({"error": "Estado desactivado. Usted ya no tiene permitido ingresar al sistema"}), 403
        # Genera el token y envíalo en la respuesta
        token = jwt.encode({
            'id_usuario': user[0],
            'id_rol': user[2],
            'dpi': user[3]
        }, current_app.config['SECRET_KEY'], algorithm='HS256')
        #save_log_param("Consulta", "INFO", "Login", "Auth_Controller", "Exito. Login Exitoso")
        return jsonify({"message": "Login exitoso", "token": token}), 200
    else:
        #save_log_param("Consulta", "ERROR", "Login", "Auth_Controller", "Error. Correo/DPI o contraseña son inválidos")
        return jsonify({"Error": "Correo/DPI o contraseña son inválidos"}), 401
    

@auth_bp.route('/me', methods=['GET'])
@token_required
def decoder(current_user):
    id_user = current_user['id_usuario']
    dpi = current_user['dpi']
    conn = get_db_connection_SQLSERVER()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT id_usuario, nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado FROM Usuario 
        WHERE id_usuario = ? OR dpi = ?
    ''',(id_user, dpi))
    userData = cursor.fetchone()
    listData = list(userData)
    conn.close()
    dataUser= {
        "id_usuario": listData[0],
        "nombres": listData[1],
        "apellidos": listData[2],
        "correo": listData[3],
        "contrasena": listData[4],
        "id_rol": listData[5],
        "telefono":listData[6],
        "dpi": listData[7],
        "genero": listData[8],
        "direccion": listData[9],
        "fecha_ingreso": listData[10],
        "id_especialidad": listData[11],
        "fecha_vencimiento_colegiado": listData[12],
        "estado":listData[13]
        }
    return jsonify(dataUser), 200