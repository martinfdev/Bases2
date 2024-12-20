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
#from REDIS.logs import save_log_param, get_log
import json
desarrollador_bp = Blueprint('desarrollador', __name__)


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

@desarrollador_bp.route('/lista_usuarios', methods=['GET'])
@token_required
@desarrollador_required
def lista_usuario(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "lista_usuarios", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si dpi existe
        cursor.execute('SELECT * FROM Usuario')
        user = cursor.fetchall()
        if not user:
            #save_log_param("consulta", "ERROR", "lista_usuarios", "Desarrollador_Controller", "No hay usuarios disponibles")
            return jsonify({"Error": "No hay usuarios disponibles"}), 409
        #print(user)
        lista_usuarios = [
            {
                "id_usuario": row[0],
                "nombres": row[1],
                "apellidos": row[2],
                "correo": row[3],
                "id_rol": row[5],
                "telefono": row[6],
                "dpi":  row[7],
                "genero": row[8],
                "direccion": row[9],
                "fecha_ingreso": row[10],
                "id_especialidad":row[11],
                "fecha_vencimiento_colegiado": row[12],
                "estado": row[13]
            } for row in user
        ]
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("consulta", "INFO", "lista_usuarios", "Desarrollador_Controller", "Exito, Consulta Realizada")
        return jsonify({
            "message": "Usuario encontrado",
            "user": lista_usuarios
        }), 200
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "lista_usuarios", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "lista_usuarios", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@desarrollador_bp.route('/insertar_especialidad', methods=['POST'])
@token_required
@desarrollador_required
def insertar_especialidad(current_user):
    data = request.get_json()
    field = 'especialidad'
    if field not in data:
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Desarrollador_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    especialidad = data['especialidad']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        conn.autocommit = False
        # Verificar si especialidad existe
        cursor.execute('SELECT * FROM Especialidad WHERE especialidad = ?', (especialidad))
        especialidad_exists = cursor.fetchone()
        if especialidad_exists:
            #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Desarrollador_Controller", "La Especialidad ya existe")
            return jsonify({"Error": "La Especialidad ya existe"}), 409
        # Inserción de datos en la tabla Especialidad
        cursor.execute(''' INSERT INTO Especialidad (especialidad)
                        VALUES(?)
                       ''',(especialidad))
        conn.commit()
        #save_log_param("Insercion", "INFO", "insertar_especialidad", "Desarrollador_Controller", "Exito, Especialidad registrada Correctamente")
        return jsonify({"message": "Especialidad registrada Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
            cursor.close()
            conn.close()

@desarrollador_bp.route('/obtener_especialidades', methods=['GET'])
@token_required
@desarrollador_required
def obtener_especialidades(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("Consulta", "ERROR", "obtener_especialidades", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si especialidad existe
        cursor.execute('SELECT * FROM Especialidad')
        especialidades = cursor.fetchall()
        print(especialidades)
        if not especialidades:
            #save_log_param("Consulta", "INFO", "obtener_especialidades", "Desarrollador_Controller", "No hay Especialidades")
            return jsonify({"message": "No hay Especialidades"}), 409
        

        cursor.close()
        conn.close()
        
        especialidades_json = [
            {
                "id_especialidad": row[0],
                "especialidad": row[1]
            } for row in especialidades
        ]
        
        #save_log_param("Consulta", "INFO", "obtener_especialidades", "Desarrollador_Controller", "consulta realizada con exito")
        return jsonify({"especialidades": especialidades_json}), 201
        

    except pyodbc.IntegrityError as e:
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@desarrollador_bp.route('/actualizar_usuario', methods=['PUT'])
@token_required
@desarrollador_required
def actualizar_usuario(current_user):
    data = request.get_json()
    required_fields = ['nombres','apellidos','correo','contrasena','telefono','dpi','direccion','id_especialidad','id_rol','fecha_vencimiento_colegiado']
    for field in required_fields:
        if field not in data:
            #save_log_param("edicion", "ERROR", "actualizar_usuario", "Desarrollador_Controller", f"Field {field} is required")
            return jsonify({"error": f"Field {field} is required"}), 400
    nombres = data['nombres']
    apellidos = data['apellidos']
    correo = data['correo']
    contrasena = data['contrasena']
    telefono = data['telefono']
    dpi = data['dpi']
    direccion = data['direccion']
    id_rol = data['id_rol']
    id_especialidad = data['id_especialidad']
    fecha_vencimiento_colegiado = data['fecha_vencimiento_colegiado']
    # Validación de formato de email
    if not re.match(email_regex, correo):
        #save_log_param("edicion", "ERROR", "actualizar_usuario", "Desarrollador_Controller", "El correo no tiene el formato adecuado")
        return jsonify({"Error": "El correo no tiene el formato adecuado"}), 400
    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(contrasena.encode('utf-8'), bcrypt.gensalt())
    #connection db
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("edicion", "ERROR", "actualizar_usuario", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:

        #validacion existe correo
        cursor.execute('SELECT * FROM Usuario WHERE dpi = ? ', (dpi))
        user_exists = cursor.fetchone()
        if not user_exists:
            #save_log_param("edicion", "ERROR", "actualizar_usuario", "Desarrollador_Controller", "El dpi no existe")
            return jsonify({"Error": "El dpi no existe"}), 409
        
        # Verificar si el email ya exite (para no insertar uno de otro usuario)
        cursor.execute('SELECT * FROM Usuario WHERE correo = ? AND dpi <> ?', (correo, dpi))
        user_exists = cursor.fetchone()
        if user_exists:
            #save_log_param("edicion", "ERROR", "actualizar_usuario", "Desarrollador_Controller", "El correo electronico ya existe")
            return jsonify({"Error": "El correo electronico ya existe"}), 409
        
        #validar si existe la especialidad (SOLO DOCTOR)
        if(id_rol ==2):
            cursor.execute('SELECT * FROM especialidad WHERE id_especialidad = ? ', (id_especialidad))
            especialidad_exist = cursor.fetchone()
            if not especialidad_exist:
                ##save_log_param("edicion", "ERROR", "actualizar_usuario", "Admin_Controller", "La especialidad no existe")
                return jsonify({"Error": "La especialidad no existe"}), 409   
        # modificacion de datos en la tabla Usuarios
        cursor.execute(''' UPDATE Usuario 
                        SET nombres = ?,
                            apellidos = ?,
                            correo = ?,
                            id_rol = ?,
                            contrasena = ?,
                            telefono = ?,
                            direccion = ?, 
                            id_especialidad = ?,
                            fecha_vencimiento_colegiado = ?
                       WHERE dpi = ?
                       ''',(nombres, apellidos, correo,id_rol, hashed_password.decode('utf-8'), telefono, direccion, id_especialidad, fecha_vencimiento_colegiado, dpi))
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("edicion", "INFO", "actualizar_usuario", "Desarrollador_Controller", "Exito, Usuario modificado Correctamente")
        return jsonify({"message": "Usuario modificado correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("edicion", "ERROR", "actualizar_usuario", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("edicion", "ERROR", "actualizar_usuario", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@desarrollador_bp.route('/eliminacion_usuario', methods=['DELETE'])
@token_required
@desarrollador_required
def eliminacion_usuario(current_user):
    data = request.get_json()
    field = 'dpi'
    if field not in data:
        #save_log_param("eliminacion", "ERROR", "eliminacion_usuario", "Desarrollador_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    dpi = data['dpi']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("eliminacion", "ERROR", "eliminacion_usuario", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si dpi existe
        cursor.execute('SELECT * FROM Usuario WHERE dpi = ?', (dpi))
        dpi_exists = cursor.fetchone()
        if not dpi_exists:
            #save_log_param("eliminacion", "ERROR", "eliminacion_usuario", "Desarrollador_Controller", "El DPI no existe")
            return jsonify({"Error": "El DPI no existe"}), 409
        
        cursor.execute(''' UPDATE Usuario 
                        SET estado = ?
                       WHERE dpi = ?
                       ''',(0, dpi))
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("eliminacion", "INFO", "eliminacion_usuario", "Desarrollador_Controller", "Exito, Usuario Eliminado Correctamente")
        return jsonify({"message": "Usuario Eliminado Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("eliminacion", "ERROR", "eliminacion_usuario", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("eliminacion", "ERROR", "eliminacion_usuario", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@desarrollador_bp.route('/consulta_usuario', methods=['POST'])
@token_required
@desarrollador_required
def consulta_usuario(current_user):
    data = request.get_json()
    field = 'dpi'
    if field not in data:
        #save_log_param("consulta", "ERROR", "consulta_usuario", "Desarrollador_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    dpi = data['dpi']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "consulta_usuario", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si dpi existe
        cursor.execute('SELECT * FROM Usuario WHERE dpi = ?', (dpi))
        user = cursor.fetchone()
        if not user:
            #save_log_param("consulta", "ERROR", "consulta_usuario", "Desarrollador_Controller", "El DPI no existe")
            return jsonify({"Error": "El DPI no existe"}), 409
        especialidad = None
        if(user[11] is not None):
            cursor.execute('SELECT especialidad FROM Especialidad WHERE id_especialidad = ?', (user[11]))
            especialidad = cursor.fetchone()[0]
            
        # Inserción de datos en la tabla Especialidad
        usuario_data = {
            "nombres": user[1],
            "apellidos": user[2],
            "correo": user[3],
            "id_rol": user[5],
            "telefono": user[6],
            "dpi": user[7],
            "genero": user[8],
            "direccion": user[9],
            "fecha_ingreso": user[10],
            "id_especialidad": user[11],
            "especialidad": especialidad,
            "fecha_vencimiento_colegiado": user[12],
            "estado": user[13]
        }
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("consulta", "INFO", "consulta_usuario", "Desarrollador_Controller", "Exito, Consulta Realizada")
        return jsonify({
            "message": "Usuario encontrado",
            "user": usuario_data
        }), 200
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "consulta_usuario", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "consulta_usuario", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500


@desarrollador_bp.route('/insertar_area', methods=['POST'])
@token_required
@desarrollador_required
def insertar_area(current_user):
    data = request.get_json()
    required_fields = ['nombre_area','capacidad']
    for field in required_fields:
        if field not in data:
            #save_log_param("Insercion", "ERROR", "insertar_area", "Desarrollador_Controller", f"Field {field} is required")
            return jsonify({"error": f"Field {field} is required"}), 400
    nombre_area = data['nombre_area']
    capacidad = data['capacidad']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("Insercion", "ERROR", "insertar_area", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        conn.autocommit = False
        # Verificar si area existe
        cursor.execute('SELECT * FROM Area WHERE nombre_area = ?', (nombre_area))
        nombre_exists = cursor.fetchone()
        if nombre_exists:
            #save_log_param("Insercion", "ERROR", "insertar_area", "Desarrollador_Controller", "Area ya existe")
            return jsonify({"Error": "Area ya existe"}), 409
        # Inserción de datos en la tabla Area
        cursor.execute(''' INSERT INTO Area (nombre_area, capacidad)
                        VALUES(?,?)
                       ''',(nombre_area, capacidad))
        conn.commit()
        #save_log_param("Insercion", "INFO", "insertar_area", "Desarrollador_Controller", "Exito, Area registrada Correctamente")
        return jsonify({"message": "Area registrada Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "insertar_area", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "insertar_area", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

@desarrollador_bp.route('/editar_area', methods=['PUT'])
@token_required
@desarrollador_required
def editar_area(current_user):
    data = request.get_json()
    required_fields = ['nombre_area','capacidad', 'nuevo_nombre_area']
    for field in required_fields:
        if field not in data:
            #save_log_param("edicion", "ERROR", "editar_area", "Desarrollador_Controller", f"Field {field} is required")
            return jsonify({"error": f"Field {field} is required"}), 400
    nombre_area = data['nombre_area']
    capacidad = data['capacidad']
    nuevo_nombre_area = data['nuevo_nombre_area']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("edicion", "ERROR", "editar_area", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM Area WHERE nombre_area = ?', (nombre_area))
        nombre_exists = cursor.fetchone()
        if not nombre_exists:
            #save_log_param("edicion", "ERROR", "editar_area", "Desarrollador_Controller", "Area a modificar no existe")
            return jsonify({"Error": "Area a modificar no existe"}), 409
        
        cursor.execute('SELECT * FROM Area WHERE nombre_area = ?', (nuevo_nombre_area))
        nombre_exists = cursor.fetchone()
        if nombre_exists:
            #save_log_param("edicion", "ERROR", "editar_area", "Desarrollador_Controller", "Mueva Area ya existe")
            return jsonify({"Error": "Nueva Area ya existe"}), 409
        # Inserción de datos en la tabla Especialidad
        cursor.execute(''' UPDATE Area 
                        SET
                            nombre_area = ?,
                            capacidad = ?
                        WHERE nombre_area = ?
                       ''',(nuevo_nombre_area, capacidad, nombre_area))
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("edicion", "INFO", "editar_area", "Desarrollador_Controller", "Exito, Area editada Correctamente")
        return jsonify({"message": "Area editada Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("edicion", "ERROR", "editar_area", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("edicion", "ERROR", "editar_area", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@desarrollador_bp.route('/eliminar_area', methods=['DELETE'])
@token_required
@desarrollador_required
def eliminar_area(current_user):
    data = request.get_json()
    field = 'nombre_area'
    if field not in data:
        #save_log_param("eliminacion", "ERROR", "eliminar_area", "Desarrollador_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    nombre_area = data['nombre_area']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("eliminacion", "ERROR", "eliminar_area", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM Area WHERE nombre_area = ?', (nombre_area))
        nombre_exists = cursor.fetchone()
        if not nombre_exists:
            #save_log_param("eliminacion", "ERROR", "eliminar_area", "Desarrollador_Controller", "Area no existe")
            return jsonify({"Error": "Area no existe"}), 409
        # Inserción de datos en la tabla Especialidad
        cursor.execute(''' DELETE FROM Area 
                        WHERE nombre_area = ?
                       ''',(nombre_area))
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("eliminacion", "INFO", "eliminar_area", "Desarrollador_Controller", "Exito, Area Eliminada Correctamente")
        return jsonify({"message": "Area Eliminada Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("eliminacion", "ERROR", "eliminar_area", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("eliminacion", "ERROR", "eliminar_area", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@desarrollador_bp.route('/consultar_area', methods=['POST'])
@token_required
@desarrollador_required
def consultar_area(current_user):
    data = request.get_json()
    field = 'nombre_area'
    if field not in data:
        #save_log_param("consulta", "ERROR", "consultar_area", "Desarrollador_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    nombre_area = data['nombre_area']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "consultar_area", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        #cursor.execute('SELECT * FROM Area WHERE nombre_area = ?', (nombre_area))
        cursor.execute('''
                        SELECT 
                            A.id_area,
                            A.nombre_area,
                            A.capacidad,
                            COUNT(P.id_paciente) AS cantidad_pacientes
                        FROM Area A
                        LEFT JOIN Paciente P ON A.id_area = P.id_area
                        WHERE nombre_area = ?
                        GROUP BY A.id_area, A.nombre_area, A.capacidad''', (nombre_area))
        
        area = cursor.fetchone()
        if not area:
            #save_log_param("consulta", "ERROR", "consultar_area", "Desarrollador_Controller", "Area no existe")
            return jsonify({"Error": "Area no existe"}), 409

        area_data = {
            "nombre_area": area[1],
            "capacidad": area[2],
            "cantidad_pacientes": area[3]
        }


        conn.commit()
        cursor.close()
        conn.close()

        #save_log_param("consulta", "INFO", "consulta_usuario", "Desarrollador_Controller", "Exito, Consulta Realizada")
        return jsonify(area_data), 200
    
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "consultar_area", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "consultar_area", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@desarrollador_bp.route('/lista_area', methods=['GET'])
@token_required
@desarrollador_required
def lista_area(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        ##save_log_param("consulta", "ERROR", "lista_area", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        cursor.execute('''
                        SELECT 
                            A.id_area,
                            A.nombre_area,
                            A.capacidad,
                            COUNT(P.id_paciente) AS cantidad_pacientes
                        FROM Area A
                        LEFT JOIN Paciente P ON A.id_area = P.id_area
                        GROUP BY A.id_area, A.nombre_area, A.capacidad''')
        areas = cursor.fetchall()
        if not areas:
            ##save_log_param("consulta", "INFO", "lista_area", "Desarrollador_Controller", "No hay Areas disponibles")
            return jsonify({"Error": "No hay Areas disponibles"}), 409
        #print(user)
        lista_areas = [
            {
                "id_area": row[0],
                "nombre_area": row[1],
                "capacidad": row[2],
                "cantidad_pacientes": row[3]
            } for row in areas
        ]
        cursor.close()
        conn.close()
        ##save_log_param("consulta", "INFO", "lista_area", "Desarrollador_Controller", "Exito, Consulta Realizada")
        return jsonify({
            "message": "Areas encontrados",
            "paciente": lista_areas
        }), 200
    except pyodbc.IntegrityError as e:
        ##save_log_param("consulta", "ERROR", "lista_area", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        ##save_log_param("consulta", "ERROR", "lista_area", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@desarrollador_bp.route('/crear_paciente', methods=['POST'])
@token_required
@desarrollador_required
def register_patient(current_user):
    data = request.get_json()
    required_fields = ['nombre','apellido','dpi','genero','fecha_nacimiento','telefono','direccion','id_area','estado']
    for field in required_fields:
        if field not in data:
            #save_log_param("Insercion", "ERROR", "crear_paciente", "Desarrollador_Controller", f"Field {field} is required")
            return jsonify({"error": f"Field {field} is required"}), 400
    nombre = data['nombre']
    apellido = data['apellido']
    dpi = data['dpi']
    genero = data['genero']
    fecha_nacimiento = data['fecha_nacimiento']
    telefono = data['telefono']
    direccion = data['direccion']
    id_area = data['id_area']
    estado = data['estado']

    #connection db
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("Insercion", "ERROR", "crear_paciente", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        conn.autocommit = False #INICIAR UNA TRANSACCION
        # Verificar si el email o dpi ya exite
        cursor.execute('SELECT * FROM Paciente WHERE dpi = ?', (dpi))
        patient_exists = cursor.fetchone()
        if patient_exists:  #PACIENTE EXISTE
            #print(patient_exists[9])
            if int(patient_exists[9]) == 0:
                cursor.execute(''' UPDATE Paciente 
                        SET nombre = ?,
                            apellido = ?,
                            dpi= ?,
                            genero = ?,
                            fecha_nacimiento = ?,
                            telefono = ?,
                            direccion = ?, 
                            id_area = ?,
                            estado = 1
                       WHERE dpi = ?
                       ''',(nombre, apellido, dpi, genero,fecha_nacimiento, telefono, direccion, id_area, dpi))
                conn.commit()
                #save_log_param("Insercion", "INFO", "crear_paciente", "Desarrollador_Controller", "Exito, Paciente registrado Correctamente")
                return jsonify({"message": "Paciente registrado correctamente"}), 201
            
            #save_log_param("Insercion", "ERROR", "crear_paciente", "Desarrollador_Controller", "El correo electronico/dpi ya existe")
            return jsonify({"Error": "El dpi ya existe"}), 409
        # Inserción de datos en la tabla Usuarios
        print(cursor)
        cursor.execute(''' INSERT INTO Paciente (nombre, apellido, dpi, genero,fecha_nacimiento, telefono, direccion, id_area, estado)
                        VALUES(?,?,?,?,?,?,?,?,?)
                       ''',(nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado))
        conn.commit()
        #save_log_param("Insercion", "INFO", "crear_paciente", "Desarrollador_Controller", "Exito, Paciente registrado Correctamente")
        return jsonify({"message": "Paciente registrado correctamente"}), 201
    except pyodbc.IntegrityError as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "crear_paciente", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "crear_paciente", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        # Asegurarse de cerrar el cursor y la conexión
        cursor.close()
        conn.close()
  
@desarrollador_bp.route('/lista_pacientes', methods=['GET'])
@token_required
@desarrollador_required
def lista_pacientes(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "lista_pacientes", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT * FROM Paciente')
        user = cursor.fetchall()
        if not user:
            #save_log_param("consulta", "INFO", "lista_pacientes", "Desarrollador_Controller", "No hay usuarios disponibles")
            return jsonify({"Error": "No hay Pacientes disponibles"}), 409
        #print(user)
        lista_usuarios = [
            {
                "id_paciente": row[0],
                "nombre": row[1],
                "apellido": row[2],
                "dpi": row[3],
                "genero": row[4],
                "fecha_nacimiento": row[5],
                "telefono": row[6],
                "direccion":  row[7],
                "id_area": row[8],
                "estado": row[9]
            } for row in user
        ]
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("consulta", "INFO", "lista_pacientes", "Desarrollador_Controller", "Exito, Consulta Realizada")
        return jsonify({
            "message": "Pacientes encontrados",
            "paciente": lista_usuarios
        }), 200
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "lista_pacientes", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "lista_pacientes", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@desarrollador_bp.route('/eliminar_paciente', methods=['DELETE'])
@token_required
@desarrollador_required
def eliminar_paciente(current_user):
    data = request.get_json()
    field = 'dpi'
    if field not in data:
        #save_log_param("eliminacion", "ERROR", "eliminar_paciente", "Desarrollador_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    dpi = data['dpi']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("eliminacion", "ERROR", "eliminar_paciente", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM Paciente WHERE dpi = ? AND estado = 1', (dpi))
        nombre_exists = cursor.fetchone()
        if not nombre_exists:
            #save_log_param("eliminacion", "ERROR", "eliminar_paciente", "Desarrollador_Controller", "Paciente no existe")
            return jsonify({"Error": "Paciente no existe"}), 409
        # Inserción de datos en la tabla Especialidad
        cursor.execute(''' UPDATE Paciente
                       Set estado = 0 
                        WHERE dpi = ?
                       ''',(dpi))
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("eliminacion", "INFO", "eliminar_paciente", "Desarrollador_Controller", "Exito, Paciente Eliminada Correctamente")
        return jsonify({"message": "Paciente Eliminado Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("eliminacion", "ERROR", "eliminar_paciente", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("eliminacion", "ERROR", "eliminar_paciente", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@desarrollador_bp.route('/consulta_paciente', methods=['POST'])
@token_required
@desarrollador_required
def consulta_paciente(current_user):
    data = request.get_json()
    field = 'dpi'
    if field not in data:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Desarrollador_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    dpi = data['dpi']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM Paciente WHERE dpi = ? AND estado = 1', (dpi))
        nombre_exists = cursor.fetchone()
        if(not nombre_exists):
            #save_log_param("consulta", "ERROR", "consulta_paciente", "Desarrollador_Controller", "Paciente no existe")
            return jsonify({"Error": "paciente no existe"}), 409

        cursor.execute('SELECT * FROM area WHERE id_area = ?', (nombre_exists[8]))
        area_exist = cursor.fetchone()
        if not nombre_exists:
            #save_log_param("consulta", "ERROR", "consulta_paciente", "Desarrollador_Controller", "area no existe")
            return jsonify({"Error": "area no existe"}), 409
        # Inserción de datos en la tabla Especialidad
        paciente ={
                "id_paciente": nombre_exists[0],
                "nombre": nombre_exists[1],
                "apellido": nombre_exists[2],
                "dpi": nombre_exists[3],
                "genero": nombre_exists[4],
                "fecha_nacimiento": nombre_exists[5],
                "telefono": nombre_exists[6],
                "direccion":  nombre_exists[7],
                "id_area": nombre_exists[8],
                "nombre_area" : area_exist[1],
                "estado": nombre_exists[9]
            }
        cursor.close()
        conn.close()
        #save_log_param("consulta", "INFO", "consulta_paciente", "Desarrollador_Controller", "Exito, Consulta realizada Correctamente")
        return jsonify({"paciente": paciente}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@desarrollador_bp.route('/editar_paciente', methods=['PUT'])
@token_required
@desarrollador_required
def editar_paciente(current_user):
    data = request.get_json()
    required_fields = ['nombre','apellido','dpi','fecha_nacimiento','telefono','direccion','id_area']
    for field in required_fields:
        if field not in data:
            #save_log_param("edicion", "ERROR", "editar_paciente", "Desarrollador_Controller", f"Field {field} is required")
            return jsonify({"error": f"Field {field} is required"}), 400
    nombre = data['nombre']
    apellido = data['apellido']
    dpi = data['dpi']
    fecha_nacimiento = data['fecha_nacimiento']
    telefono = data['telefono']
    direccion = data['direccion']
    id_area = data['id_area']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("edicion", "ERROR", "editar_paciente", "Desarrollador_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM paciente WHERE dpi = ?', (dpi))
        paciente_exists = cursor.fetchone()
        if not paciente_exists:
            #save_log_param("edicion", "ERROR", "editar_paciente", "Desarrollador_Controller", "Paciente no existe")
            return jsonify({"Error": "Paciente no existe"}), 409
        #VALIDAR EL AREA SI EXISTE
        cursor.execute('SELECT * FROM Area WHERE id_area = ?', (id_area))
        area_exists = cursor.fetchone()
        if not area_exists:
            #save_log_param("edicion", "ERROR", "editar_paciente", "Desarrollador_Controller", "Area no existe")
            return jsonify({"Error": "Area no existe"}), 409

        # Inserción de datos en la tabla Especialidad
        cursor.execute(''' UPDATE Paciente 
                        SET
                            nombre = ?,
                            apellido = ?,
                            fecha_nacimiento = ?,
                            telefono = ?,
                            direccion = ?,
                            id_area = ?
                        WHERE dpi = ?
                       ''',(nombre, apellido, fecha_nacimiento, telefono, direccion, id_area, dpi))
        conn.commit()
        #save_log_param("edicion", "INFO", "editar_paciente", "Desarrollador_Controller", "Exito, Area registrada Correctamente")
        return jsonify({"message": "Paciente editado Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("edicion", "ERROR", "editar_paciente", "Desarrollador_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("edicion", "ERROR", "editar_paciente", "Desarrollador_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()
