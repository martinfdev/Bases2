from flask import Blueprint, jsonify, request
from datetime import datetime
import sys
import os
config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
sys.path.append(config_path)
from CONFIG.connection import get_db_connection_SQLSERVER
from CONFIG.decorators import token_required, admin_required
import bcrypt
import pyodbc
import re
from REDIS.logs import save_log_param
admin_bp = Blueprint('admin', __name__)


@admin_bp.route('/dashboard', methods=['GET']) #dashbord para el administrador
@token_required
@admin_required
def admin_route(current_user):
    print(current_user)
    return jsonify({"message": f"Welcome admin, user {current_user['id_usuario']}!"}), 200


email_regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

@admin_bp.route('/register', methods=['POST'])
@token_required
@admin_required
def register_user(current_user):
    data = request.get_json()
    required_fields = ['nombres','apellidos','correo','contrasena','id_rol','telefono','dpi','genero','direccion','fecha_ingreso','id_especialidad','fecha_vencimiento_colegiado','estado']
    for field in required_fields:
        if field not in data:
            #save_log_param("Insercion", "ERROR", "register", "Admin_Controller", f"Field {field} is required")
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
        #save_log_param("Insercion", "ERROR", "register", "Admin_Controller", "El correo no tiene el formato adecuado")
        return jsonify({"Error": "El correo no tiene el formato adecuado"}), 400
    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(contrasena.encode('utf-8'), bcrypt.gensalt())
    #connection db
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("Insercion", "ERROR", "register", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        print("entro al try")
        # Verificar si el email o dpi ya exite
        cursor.execute('SELECT * FROM Usuario WHERE dpi = ? OR correo = ?', (dpi, correo))
        user_exists = cursor.fetchone()
        if user_exists:
            #save_log_param("Insercion", "ERROR", "register", "Admin_Controller", "El correo electronico/dpi ya existe")
            return jsonify({"Error": "El correo electronico/dpi ya existe"}), 409
        # Inserción de datos en la tabla Usuarios
        print(cursor)
        cursor.execute(''' INSERT INTO Usuario (nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero ,direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado)
                        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
                       ''',(nombres, apellidos, correo, hashed_password.decode('utf-8'), id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado))
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("Insercion", "INFO", "register", "Admin_Controller", "Exito, Usuario registrado Correctamente")
        return jsonify({"message": "Usuario registrado correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("Insercion", "ERROR", "register", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("Insercion", "ERROR", "register", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    


@admin_bp.route('/insertar_especialidad', methods=['POST'])
@token_required
@admin_required
def insertar_especialidad(current_user):
    data = request.get_json()
    field = 'especialidad'
    if field not in data:
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Admin_Controller", "f"Field {field} is required"")
        return jsonify({"error": f"Field {field} is required"}), 400
    especialidad = data['especialidad']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si especialidad existe
        cursor.execute('SELECT * FROM Especialidad WHERE especialidad = ?', (especialidad))
        especialidad_exists = cursor.fetchone()
        if especialidad_exists:
            #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Admin_Controller", "La Especialidad ya existe")
            return jsonify({"Error": "La Especialidad ya existe"}), 409
        # Inserción de datos en la tabla Especialidad
        cursor.execute(''' INSERT INTO Especialidad (especialidad)
                        VALUES(?)
                       ''',(especialidad))
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("Insercion", "INFO", "insertar_especialidad", "Admin_Controller", "Exito, Especialidad registrada Correctamente")
        return jsonify({"message": "Especialidad registrada Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500


@admin_bp.route('/actualizar_usuario', methods=['PUT'])
@token_required
@admin_required
def actualizar_usuario(current_user):
    data = request.get_json()
    required_fields = ['nombres','apellidos','correo','contrasena','telefono','dpi','direccion','id_especialidad','fecha_vencimiento_colegiado']
    for field in required_fields:
        if field not in data:
            #save_log_param("update", "ERROR", "actualizar_usuario", "Admin_Controller", f"Field {field} is required")
            return jsonify({"error": f"Field {field} is required"}), 400
    nombres = data['nombres']
    apellidos = data['apellidos']
    correo = data['correo']
    contrasena = data['contrasena']
    telefono = data['telefono']
    dpi = data['dpi']
    direccion = data['direccion']
    id_especialidad = data['id_especialidad']
    fecha_vencimiento_colegiado = data['fecha_vencimiento_colegiado']
    # Validación de formato de email
    if not re.match(email_regex, correo):
        #save_log_param("update", "ERROR", "actualizar_usuario", "Admin_Controller", "El correo no tiene el formato adecuado")
        return jsonify({"Error": "El correo no tiene el formato adecuado"}), 400
    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(contrasena.encode('utf-8'), bcrypt.gensalt())
    #connection db
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("update", "ERROR", "actualizar_usuario", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        print("entro al try")
        # Verificar si el email ya exite (para no insertar uno de otro usuario)
        cursor.execute('SELECT * FROM Usuario WHERE correo = ? AND dpi <> ?', (correo, dpi))
        user_exists = cursor.fetchone()
        if user_exists:
            #save_log_param("update", "ERROR", "actualizar_usuario", "Admin_Controller", "El correo electronico ya existe")
            return jsonify({"Error": "El correo electronico ya existe"}), 409
        
        #validacion existe correo
        cursor.execute('SELECT * FROM Usuario WHERE dpi = ? ', (dpi))
        user_exists = cursor.fetchone()
        if not user_exists:
            #save_log_param("update", "ERROR", "actualizar_usuario", "Admin_Controller", "El dpi  existe")
            return jsonify({"Error": "El dpi  existe"}), 409 
        
        cursor.execute('SELECT * FROM especialidad WHERE id_especialidad = ? ', (id_especialidad))
        especialidad_exist = cursor.fetchone()
        if not especialidad_exist:
            #save_log_param("update", "ERROR", "actualizar_usuario", "Admin_Controller", "La especialidad no existe")
            return jsonify({"Error": "La especialidad no existe"}), 409   
        # modificacion de datos en la tabla Usuarios
        cursor.execute(''' UPDATE Usuario 
                        SET nombres = ?,
                            apellidos = ?,
                            correo = ?,
                            contrasena = ?,
                            telefono = ?,
                            direccion = ?, 
                            id_especialidad = ?,
                            fecha_vencimiento_colegiado = ?
                       WHERE dpi = ?
                       ''',(nombres, apellidos, correo, hashed_password.decode('utf-8'), telefono, direccion, id_especialidad, fecha_vencimiento_colegiado, dpi))
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("update", "INFO", "actualizar_usuario", "Admin_Controller", "Exito, Usuario modificado Correctamente")
        return jsonify({"message": "Usuario modificado correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("update", "ERROR", "actualizar_usuario", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("update", "ERROR", "actualizar_usuario", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@admin_bp.route('/eliminacion_usuario', methods=['DELETE'])
@token_required
@admin_required
def eliminacion_usuario(current_user):
    data = request.get_json()
    field = 'dpi'
    if field not in data:
        #save_log_param("eliminacion", "ERROR", "eliminacion_usuario", "Admin_Controller", "f"Field {field} is required"")
        return jsonify({"error": f"Field {field} is required"}), 400
    dpi = data['dpi']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("eliminacion", "ERROR", "eliminacion_usuario", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si dpi existe
        cursor.execute('SELECT * FROM Usuario WHERE dpi = ?', (dpi))
        dpi_exists = cursor.fetchone()
        if not dpi_exists:
            #save_log_param("eliminacion", "ERROR", "eliminacion_usuario", "Admin_Controller", "La Especialidad ya existe")
            return jsonify({"Error": "El DPI no existe"}), 409
        # Inserción de datos en la tabla Especialidad
        cursor.execute(''' DELETE FROM Usuario 
                            WHERE dpi = ?
                       ''',(dpi))
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("eliminacion", "INFO", "eliminacion_usuario", "Admin_Controller", "Exito, Usuario Eliminado Correctamente")
        return jsonify({"message": "Usuario Eliminado Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("eliminacion", "ERROR", "eliminacion_usuario", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("eliminacion", "ERROR", "eliminacion_usuario", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@admin_bp.route('/consulta_usuario', methods=['POST'])
@token_required
@admin_required
def consulta_usuario(current_user):
    data = request.get_json()
    field = 'dpi'
    if field not in data:
        #save_log_param("consulta", "ERROR", "consulta_usuario", "Admin_Controller", "f"Field {field} is required"")
        return jsonify({"error": f"Field {field} is required"}), 400
    dpi = data['dpi']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "consulta_usuario", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si dpi existe
        cursor.execute('SELECT * FROM Usuario WHERE dpi = ?', (dpi))
        user = cursor.fetchone()
        if not user:
            #save_log_param("consulta", "ERROR", "consulta_usuario", "Admin_Controller", "La Especialidad ya existe")
            return jsonify({"Error": "El DPI no existe"}), 409
        
        cursor.execute('SELECT especialidad FROM Especialidad WHERE id_especialidad = ?', (user[11]))
        especialidad = cursor.fetchone()[0]
        # Inserción de datos en la tabla Especialidad
        usuario_data = {
            "nombres": user[1],
            "apellidos": user[2],
            "correo": user[3],
            "rol": user[5],
            "telefono": user[6],
            "dpi": user[7],
            "genero": user[8],
            "direccion": user[9],
            "fecha_ingreso": user[10],
            "especialidad": especialidad,
            "fecha_vencimiento_colegiado": user[12]
        }
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("consulta", "INFO", "consulta_usuario", "Admin_Controller", "Exito, Consulta Realizada")
        return jsonify({
            "message": "Usuario encontrado",
            "user": usuario_data
        }), 200
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "consulta_usuario", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "consulta_usuario", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

'''

BAKEND
---SERVICIO_AUTH
---SERVICIO_REDIS
---SERVICIO_ADMIN
---SERVICIO_DOCTOR
---SERVICIO_ENFERMERA


'''