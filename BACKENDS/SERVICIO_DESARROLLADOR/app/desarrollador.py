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
from REDIS.logs import save_log_param, get_log
import json
desarrollador_bp = Blueprint('desarrolaldor', __name__)


@desarrollador_bp.route('/dashboard', methods=['GET']) #dashbord para el desarrollador
@token_required
@desarrollador_required
def admin_route(current_user):
    print(current_user)
    return jsonify({"message": f"Welcome desarrollador, user {current_user['id_usuario']}!"}), 200

email_regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

@desarrollador_bp.route('/register', methods=['POST'])
@token_required
@desarrollador_required
def register_user(current_user):
    data = request.get_json()
    required_fields = ['nombres','apellidos','correo','contrasena','id_rol','telefono','dpi','genero','direccion','fecha_ingreso','id_especialidad','fecha_vencimiento_colegiado','estado']
    for field in required_fields:
        if field not in data:
            #save_log_param("Insercion", "ERROR", "register", "Desarrollador_Controller", f"Field {field} is required")
            return jsonify({"error": f"Field {field} is required"}), 400
    nombres = data['nombres']
    apellidos = data['apellidos']
    correo = data['correo']
    contrasena = data['contrasena']
    id_rol = data['id_rol'] #maneja diversos tipos de usuarios: doc, enfermera, admin, programador
    telefono = data['telefono']
    dpi = data['dpi']
    genero = data['genero']
    direccion = data['direccion']
    fecha_ingreso = data['fecha_ingreso']
    id_especialidad = data['id_especialidad']
    fecha_vencimiento_colegiado = data['fecha_vencimiento_colegiado']
    estado = data['estado']
    # Validación de formato de email
    if not re.match(email_regex, correo):
        #save_log_param("Insercion", "ERROR", "register", "Desarrollador_Controller", "El correo no tiene el formato adecuado")
        return jsonify({"Error": "El correo no tiene el formato adecuado"}), 400
    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(contrasena.encode('utf-8'), bcrypt.gensalt())
    #connection db
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("Insercion", "ERROR", "register", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        conn.autocommit = False
        #print("entro al try")
        # Verificar si el email o dpi ya exite
        cursor.execute('SELECT * FROM Usuario WHERE dpi = ? OR correo = ?', (dpi, correo))
        user_exists = cursor.fetchone()
        if user_exists:
            #VALIDAR QUE EL USURIO TENGA ESTADO 0 PARA MODIFICARLO
            if int(user_exists[13]) == 0:
                cursor.execute(''' UPDATE Usuario 
                        SET nombres = ?,
                            apellidos = ?,
                            correo = ?,
                            contrasena = ?,
                            id_rol=?,
                            telefono = ?,
                            dpi= ?,
                            genero = ?,
                            direccion = ?, 
                            fecha_ingreso = ?,
                            id_especialidad = ?,
                            fecha_vencimiento_colegiado = ?,
                            estado = 1
                       WHERE dpi = ?
                       ''',(nombres, apellidos, correo, hashed_password.decode('utf-8'),id_rol, telefono, dpi, genero, direccion,fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, dpi))
                conn.commit()
                #save_log_param("Insercion", "INFO", "register", "Desarrollador_Controller", "Exito, Usuario registrado Correctamente")
                return jsonify({"message": "Usuario registrado correctamente"}), 201
            #save_log_param("Insercion", "ERROR", "register", "Desarrollador_Controller", "El correo electronico/dpi ya existe")
            return jsonify({"Error": "El correo electronico/dpi ya existe"}), 409
        # Inserción de datos en la tabla Usuarios
        print(cursor)
        cursor.execute(''' INSERT INTO Usuario (nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero ,direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado)
                        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
                       ''',(nombres, apellidos, correo, hashed_password.decode('utf-8'), id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado))
        conn.commit()
        #save_log_param("Insercion", "INFO", "register", "Desarrollador_Controller", "Exito, Usuario registrado Correctamente")
        return jsonify({"message": "Usuario registrado correctamente"}), 201
    except pyodbc.IntegrityError as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "register", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "register", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
            cursor.close()
            conn.close()

@desarrollador_bp.route('/logs', methods=['GET']) 
@token_required
@desarrollador_required
def logs(current_user):
    data = get_log()
    print(data)
    try:
        data_dict = json.loads(data) 
        lista_logs = data_dict.get("logs", []) 
        if "error" in data_dict:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500
        if "message" in data_dict:
            return jsonify({"message": data_dict["message"]}), 404
    except json.JSONDecodeError as e:
        return jsonify({"error": "Error al obtener logs", "message": str(e)}), 400
    return jsonify({"logs": lista_logs}), 200
