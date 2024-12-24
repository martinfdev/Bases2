from flask import Blueprint, jsonify, request, send_file
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

from .reporte_estadisticas import get_pacientes_atendidos, get_diagnosticos_mas_comunes, get_estado_area
from .descargar_reportes import generar_pdf_areas, generar_excel_areas,generar_pdf_diagnosticos_comunes, generar_pdf_pacientes_atendidos, generar_excel_pacientes_atendidos, generar_excel_diagnosticos_comunes

admin_bp = Blueprint('admin', __name__)


@admin_bp.route('/dashboard', methods=['GET']) #dashbord para el administrador
@token_required
@admin_required
def admin_route(current_user):
    print(current_user)
    return jsonify({"message": f"Welcome admin, user {current_user['id_usuario']}!"}), 200


email_regex = r'^[a-zA-Z0-9]+[\._]?[a-zA-Z0-9]+[@]\w+[.]\w{2,3}$'

@admin_bp.route('/register', methods=['POST'])
@token_required
@admin_required
def register_user(current_user):
    data = request.get_json()
    print(data)
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
        conn.autocommit = False
        #print("entro al try")
        # Verificar si el email o dpi ya exite
        cursor.execute('SELECT * FROM Usuario WHERE dpi = ? OR correo = ?', (dpi, correo))
        user_exists = cursor.fetchone()
        if user_exists: #EL USUARIO EXISTE
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
                #save_log_param("Insercion", "INFO", "register", "Admin_Controller", "Exito, Usuario registrado Correctamente")
                return jsonify({"message": "Usuario registrado correctamente"}), 201


            #save_log_param("Insercion", "ERROR", "register", "Admin_Controller", "El correo electronico/dpi ya existe")
            return jsonify({"Error": "El correo electronico/dpi ya existe"}), 409
        # Inserción de datos en la tabla Usuarios
        print(cursor)
        cursor.execute(''' INSERT INTO Usuario (nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero ,direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado)
                        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
                       ''',(nombres, apellidos, correo, hashed_password.decode('utf-8'), id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado))
        conn.commit()
        #save_log_param("Insercion", "INFO", "register", "Admin_Controller", "Exito, Usuario registrado Correctamente")
        return jsonify({"message": "Usuario registrado correctamente"}), 201
    except pyodbc.IntegrityError as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "register", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        print(e)
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "register", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()
    
@admin_bp.route('/lista_usuarios', methods=['GET'])
@token_required
@admin_required
def lista_usuario(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "lista_usuarios", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si dpi existe
        cursor.execute('SELECT * FROM Usuario')
        user = cursor.fetchall()
        if not user:
            #save_log_param("consulta", "ERROR", "lista_usuarios", "Admin_Controller", "No hay usuarios disponibles")
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
        #save_log_param("consulta", "INFO", "lista_usuarios", "Admin_Controller", "Exito, Consulta Realizada")
        return jsonify({
            "message": "Usuario encontrado",
            "user": lista_usuarios
        }), 200
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "lista_usuarios", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "lista_usuarios", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@admin_bp.route('/insertar_especialidad', methods=['POST'])
@token_required
@admin_required
def insertar_especialidad(current_user):
    data = request.get_json()
    field = 'especialidad'
    if field not in data:
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Admin_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    especialidad = data['especialidad']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        conn.autocommit = False
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
        #save_log_param("Insercion", "INFO", "insertar_especialidad", "Admin_Controller", "Exito, Especialidad registrada Correctamente")
        return jsonify({"message": "Especialidad registrada Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "insertar_especialidad", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
            cursor.close()
            conn.close()

@admin_bp.route('/obtener_especialidades', methods=['GET'])
@token_required
@admin_required
def obtener_especialidades(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("Consulta", "ERROR", "obtener_especialidades", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si especialidad existe
        cursor.execute('SELECT * FROM Especialidad')
        especialidades = cursor.fetchall()
        print(especialidades)
        if not especialidades:
            #save_log_param("Consulta", "ERROR", "obtener_especialidades", "Admin_Controller", "No hay Especialidades")
            return jsonify({"message": "No hay Especialidades"}), 409
        

        cursor.close()
        conn.close()
        
        especialidades_json = [
            {
                "id_especialidad": row[0],
                "especialidad": row[1]
            } for row in especialidades
        ]
        
        #save_log_param("Consulta", "INFO", "obtener_especialidades", "Admin_Controller", "consulta realizada con exito")
        return jsonify({"especialidades": especialidades_json}), 201
        

    except pyodbc.IntegrityError as e:
        #save_log_param("Consulta", "ERROR", "insertar_especialidad", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("Consulta", "ERROR", "insertar_especialidad", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@admin_bp.route('/actualizar_usuario', methods=['PUT'])
@token_required
@admin_required
def actualizar_usuario(current_user):
    data = request.get_json()
    required_fields = ['nombres','apellidos','correo','contrasena','telefono','dpi','direccion','id_especialidad','id_rol','fecha_vencimiento_colegiado']
    for field in required_fields:
        if field not in data:
            #save_log_param("edicion", "ERROR", "actualizar_usuario", "Admin_Controller", f"Field {field} is required")
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
        #save_log_param("edicion", "ERROR", "actualizar_usuario", "Admin_Controller", "El correo no tiene el formato adecuado")
        return jsonify({"Error": "El correo no tiene el formato adecuado"}), 400
    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(contrasena.encode('utf-8'), bcrypt.gensalt())
    #connection db
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("edicion", "ERROR", "actualizar_usuario", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:

        #validacion existe correo
        cursor.execute('SELECT * FROM Usuario WHERE dpi = ? ', (dpi))
        user_exists = cursor.fetchone()
        if not user_exists:
            #save_log_param("edicion", "ERROR", "actualizar_usuario", "Admin_Controller", "El dpi  existe")
            return jsonify({"Error": "El dpi no existe"}), 409
        
        # Verificar si el email ya exite (para no insertar uno de otro usuario)
        cursor.execute('SELECT * FROM Usuario WHERE correo = ? AND dpi <> ?', (correo, dpi))
        user_exists = cursor.fetchone()
        if user_exists:
            #save_log_param("edicion", "ERROR", "actualizar_usuario", "Admin_Controller", "El correo electronico ya existe")
            return jsonify({"Error": "El correo electronico ya existe"}), 409
        
        #validar si existe la especialidad (SOLO DOCTOR)
        if(id_rol ==2):
            cursor.execute('SELECT * FROM especialidad WHERE id_especialidad = ? ', (id_especialidad))
            especialidad_exist = cursor.fetchone()
            if not especialidad_exist:
                #save_log_param("edicion", "ERROR", "actualizar_usuario", "Admin_Controller", "La especialidad no existe")
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
        #save_log_param("edicion", "INFO", "actualizar_usuario", "Admin_Controller", "Exito, Usuario modificado Correctamente")
        return jsonify({"message": "Usuario modificado correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("edicion", "ERROR", "actualizar_usuario", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("edicion", "ERROR", "actualizar_usuario", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@admin_bp.route('/eliminacion_usuario', methods=['DELETE'])
@token_required
@admin_required
def eliminacion_usuario(current_user):
    data = request.get_json()
    field = 'dpi'
    if field not in data:
        #save_log_param("eliminacion", "ERROR", "eliminacion_usuario", "Admin_Controller", f"Field {field} is required")
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
            #save_log_param("eliminacion", "ERROR", "eliminacion_usuario", "Admin_Controller", "El DPI no existe")
            return jsonify({"Error": "El DPI no existe"}), 409
        
        cursor.execute(''' UPDATE Usuario 
                        SET estado = ?
                       WHERE dpi = ?
                       ''',(0, dpi))
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
        #save_log_param("consulta", "ERROR", "consulta_usuario", "Admin_Controller", f"Field {field} is required")
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
            #save_log_param("consulta", "ERROR", "consulta_usuario", "Admin_Controller", "El DPI no existe")
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

@admin_bp.route('/insertar_area', methods=['POST'])
@token_required
@admin_required
def insertar_area(current_user):
    data = request.get_json()
    required_fields = ['nombre_area','capacidad']
    for field in required_fields:
        if field not in data:
            #save_log_param("Insercion", "ERROR", "insertar_area", "Admin_Controller", f"Field {field} is required")
            return jsonify({"error": f"Field {field} is required"}), 400
    nombre_area = data['nombre_area']
    capacidad = data['capacidad']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("Insercion", "ERROR", "insertar_area", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        conn.autocommit = False
        # Verificar si area existe
        cursor.execute('SELECT * FROM Area WHERE nombre_area = ?', (nombre_area))
        nombre_exists = cursor.fetchone()
        if nombre_exists:
            #save_log_param("Insercion", "ERROR", "insertar_area", "Admin_Controller", "Area ya existe")
            return jsonify({"Error": "Area ya existe"}), 409
        # Inserción de datos en la tabla Area
        cursor.execute(''' INSERT INTO Area (nombre_area, capacidad)
                        VALUES(?,?)
                       ''',(nombre_area, capacidad))
        conn.commit()
        #save_log_param("Insercion", "INFO", "insertar_area", "Admin_Controller", "Exito, Area registrada Correctamente")
        return jsonify({"message": "Area registrada Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "insertar_area", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "insertar_area", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

@admin_bp.route('/editar_area', methods=['PUT'])
@token_required
@admin_required
def editar_area(current_user):
    data = request.get_json()
    required_fields = ['nombre_area','capacidad', 'nuevo_nombre_area']
    for field in required_fields:
        if field not in data:
            #save_log_param("edicion", "ERROR", "editar_area", "Admin_Controller", f"Field {field} is required")
            return jsonify({"error": f"Field {field} is required"}), 400
    nombre_area = data['nombre_area']
    capacidad = data['capacidad']
    nuevo_nombre_area = data['nuevo_nombre_area']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("edicion", "ERROR", "editar_area", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM Area WHERE nombre_area = ?', (nombre_area))
        nombre_exists = cursor.fetchone()
        if not nombre_exists:
            #save_log_param("edicion", "ERROR", "editar_area", "Admin_Controller", "Area a modificar no existe")
            return jsonify({"Error": "Area a modificar no existe"}), 409
        
        cursor.execute('SELECT * FROM Area WHERE nombre_area = ?', (nuevo_nombre_area))
        nombre_exists = cursor.fetchone()
        if nombre_exists:
            #save_log_param("edicion", "ERROR", "editar_area", "Admin_Controller", "Nueva Area ya existe")
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
        #save_log_param("edicion", "INFO", "editar_area", "Admin_Controller", "Exito, Area editada Correctamente")
        return jsonify({"message": "Area editada Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("edicion", "ERROR", "editar_area", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("edicion", "ERROR", "editar_area", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@admin_bp.route('/eliminar_area', methods=['DELETE'])
@token_required
@admin_required
def eliminar_area(current_user):
    data = request.get_json()
    field = 'nombre_area'
    if field not in data:
        #save_log_param("eliminacion", "ERROR", "eliminar_area", "Admin_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    nombre_area = data['nombre_area']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("eliminacion", "ERROR", "eliminar_area", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM Area WHERE nombre_area = ?', (nombre_area))
        nombre_exists = cursor.fetchone()
        if not nombre_exists:
            #save_log_param("eliminacion", "ERROR", "eliminar_area", "Admin_Controller", "Area no existe")
            return jsonify({"Error": "Area no existe"}), 409
        # Inserción de datos en la tabla Especialidad
        cursor.execute(''' DELETE FROM Area 
                        WHERE nombre_area = ?
                       ''',(nombre_area))
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("eliminacion", "INFO", "eliminar_area", "Admin_Controller", "Exito, Area Eliminada Correctamente")
        return jsonify({"message": "Area Eliminada Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("eliminacion", "ERROR", "eliminar_area", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("eliminacion", "ERROR", "eliminar_area", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@admin_bp.route('/consultar_area', methods=['POST'])
@token_required
@admin_required
def consultar_area(current_user):
    data = request.get_json()
    field = 'nombre_area'
    if field not in data:
        #save_log_param("consulta", "ERROR", "consultar_area", "Admin_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    nombre_area = data['nombre_area']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "consultar_area", "Admin_Controller", "Error al conectarse con la base de datos")
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
                        LEFT JOIN Paciente P ON A.id_area = P.id_area AND P.estado = 1
                        WHERE nombre_area = ?
                        GROUP BY A.id_area, A.nombre_area, A.capacidad''', (nombre_area))
        
        area = cursor.fetchone()
        if not area:
            #save_log_param("consulta", "ERROR", "consultar_area", "Admin_Controller", "Area no existe")
            return jsonify({"Error": "Area no existe"}), 409

        area_data = {
            "nombre_area": area[1],
            "capacidad": area[2],
            "cantidad_pacientes": area[3]
        }


        conn.commit()
        cursor.close()
        conn.close()

        #save_log_param("consulta", "INFO", "consulta_usuario", "Admin_Controller", "Exito, Consulta Realizada")
        return jsonify(area_data), 200
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "consultar_area", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "consultar_area", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@admin_bp.route('/lista_area', methods=['GET'])
@token_required
@admin_required
def lista_area(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_paramm("consulta", "ERROR", "lista_area", "Admin_Controller", "Error al conectarse con la base de datos")
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
                        LEFT JOIN Paciente P ON A.id_area = P.id_area AND P.estado = 1
                        GROUP BY A.id_area, A.nombre_area, A.capacidad''')
        areas = cursor.fetchall()
        if not areas:
            #save_log_paramm("consulta", "ERROR", "lista_area", "Admin_Controller", "No hay Areas disponibles")
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
        #save_log_paramm("consulta", "INFO", "lista_area", "Admin_Controller", "Exito, Consulta Realizada")
        return jsonify({
            "message": "Areas encontrados",
            "paciente": lista_areas
        }), 200
    except pyodbc.IntegrityError as e:
        #save_log_paramm("consulta", "ERROR", "lista_area", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_paramm("consulta", "ERROR", "lista_area", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@admin_bp.route('/crear_paciente', methods=['POST'])
@token_required
@admin_required
def register_patient(current_user):
    data = request.get_json()
    required_fields = ['nombre','apellido','dpi','genero','fecha_nacimiento','telefono','direccion','id_area','estado']
    for field in required_fields:
        if field not in data:
            #save_log_param("Insercion", "ERROR", "crear_paciente", "Admin_Controller", f"Field {field} is required")
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
        #save_log_param("Insercion", "ERROR", "crear_paciente", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        conn.autocommit = False #INICIAR UNA TRANSACCION

        #VALIDAR ESPACIO EN AREA
        cursor.execute('SELECT COUNT(*) FROM Paciente WHERE id_area = ?', (id_area))
        cantidad = cursor.fetchone()[0]
        
        cursor.execute('SELECT * FROM Area WHERE id_area = ?', (id_area))
        area_actual = cursor.fetchone()[2]

        if(int(area_actual) < int(cantidad)+1 ):
            conn.rollback()
            #save_log_param("Insercion", "ERROR", "crear_paciente", "Admin_Controller", "Error. El area ya no tiene espacio para otro paciente")
            return jsonify({"message": "El area ya no tiene espacio para otro paciente"}), 201

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
                #save_log_param("Insercion", "INFO", "crear_paciente", "Admin_Controller", "Exito, Paciente registrado Correctamente")
                return jsonify({"message": "Paciente registrado correctamente"}), 201
            
            #save_log_param("Insercion", "ERROR", "crear_paciente", "Admin_Controller", "El correo dpi ya existe")
            return jsonify({"Error": "El dpi ya existe"}), 409
        # Inserción de datos en la tabla Usuarios
        print(cursor)
        cursor.execute(''' INSERT INTO Paciente (nombre, apellido, dpi, genero,fecha_nacimiento, telefono, direccion, id_area, estado)
                        VALUES(?,?,?,?,?,?,?,?,?)
                       ''',(nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado))
        conn.commit()
        #save_log_param("Insercion", "INFO", "crear_paciente", "Admin_Controller", "Exito, Paciente registrado Correctamente")
        return jsonify({"message": "Paciente registrado correctamente"}), 201
    except pyodbc.IntegrityError as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "crear_paciente", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        conn.rollback()
        #save_log_param("Insercion", "ERROR", "crear_paciente", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        # Asegurarse de cerrar el cursor y la conexión
        cursor.close()
        conn.close()
  
@admin_bp.route('/lista_pacientes', methods=['GET'])
@token_required
@admin_required
def lista_pacientes(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "lista_pacientes", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT * FROM Paciente')
        user = cursor.fetchall()
        if not user:
            #save_log_param("consulta", "ERROR", "lista_pacientes", "Admin_Controller", "No hay Pacientes disponibles")
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
        #save_log_param("consulta", "INFO", "lista_pacientes", "Admin_Controller", "Exito, Consulta Realizada")
        return jsonify({
            "message": "Pacientes encontrados",
            "paciente": lista_usuarios
        }), 200
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "lista_pacientes", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "lista_pacientes", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@admin_bp.route('/eliminar_paciente', methods=['DELETE'])
@token_required
@admin_required
def eliminar_paciente(current_user):
    data = request.get_json()
    field = 'dpi'
    if field not in data:
        #save_log_param("eliminacion", "ERROR", "eliminar_paciente", "Admin_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    dpi = data['dpi']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("eliminacion", "ERROR", "eliminar_paciente", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM Paciente WHERE dpi = ? AND estado = 1', (dpi))
        nombre_exists = cursor.fetchone()
        if not nombre_exists:
            #save_log_param("eliminacion", "ERROR", "eliminar_paciente", "Admin_Controller", "Paciente no existe")
            return jsonify({"Error": "Paciente no existe"}), 409
        # Inserción de datos en la tabla Especialidad
        cursor.execute(''' UPDATE Paciente
                        Set estado = 0 
                        WHERE dpi = ?
                       ''',(dpi))
        conn.commit()
        cursor.close()
        conn.close()
        #save_log_param("eliminacion", "INFO", "eliminar_paciente", "Admin_Controller", "Exito, Paciente Eliminado Correctamente")
        return jsonify({"message": "Paciente Eliminado Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("eliminacion", "ERROR", "eliminar_paciente", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("eliminacion", "ERROR", "eliminar_paciente", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@admin_bp.route('/consulta_paciente', methods=['POST'])
@token_required
@admin_required
def consulta_paciente(current_user):
    data = request.get_json()
    field = 'dpi'
    if field not in data:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Admin_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    dpi = data['dpi']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM Paciente WHERE dpi = ? AND estado = 1', (dpi))
        nombre_exists = cursor.fetchone()
        if(not nombre_exists):
            #save_log_param("consulta", "ERROR", "consulta_paciente", "Admin_Controller", "Paciente no existe")
            return jsonify({"Error": "paciente no existe"}), 409

        cursor.execute('SELECT * FROM area WHERE id_area = ?', (nombre_exists[8]))
        area_exist = cursor.fetchone()
        if not nombre_exists:
            #save_log_param("consulta", "ERROR", "consulta_paciente", "Admin_Controller", "area no existe")
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
        #save_log_param("consulta", "INFO", "consulta_paciente", "Admin_Controller", "Exito, Consulta realizada Correctamente")
        return jsonify({"paciente": paciente}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@admin_bp.route('/editar_paciente', methods=['PUT'])
@token_required
@admin_required
def editar_paciente(current_user):
    data = request.get_json()
    required_fields = ['nombre','apellido','dpi','fecha_nacimiento','telefono','direccion','id_area']
    for field in required_fields:
        if field not in data:
            #save_log_param("edicion", "ERROR", "editar_paciente", "Admin_Controller", f"Field {field} is required")
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
        #save_log_param("edicion", "ERROR", "editar_paciente", "Admin_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM paciente WHERE dpi = ?', (dpi))
        paciente_exists = cursor.fetchone()
        if not paciente_exists:
            #save_log_param("edicion", "ERROR", "editar_paciente", "Admin_Controller", "Paciente no existe")
            return jsonify({"Error": "Paciente no existe"}), 409
        #VALIDAR EL AREA SI EXISTE
        cursor.execute('SELECT * FROM Area WHERE id_area = ?', (id_area))
        area_exists = cursor.fetchone()
        if not area_exists:
            #save_log_param("edicion", "ERROR", "editar_paciente", "Admin_Controller", "Area no existe")
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
        #save_log_param("edicion", "INFO", "editar_paciente", "Admin_Controller", "Exito, Area registrada Correctamente")
        return jsonify({"message": "Paciente editado Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("edicion", "ERROR", "editar_paciente", "Admin_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("edicion", "ERROR", "editar_paciente", "Admin_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

@admin_bp.route('/pacientes-atendidos', methods=['GET']) #dashbord para el administrador
@token_required
@admin_required
def obtener_pacientes_atendidos(current_user):
    estadisticas = get_pacientes_atendidos()
    if not estadisticas:
        return jsonify({"message": "No hay pacientes atendidos."}), 200
    return jsonify(estadisticas), 200


@admin_bp.route('/obtener-diagnosticos-comunes', methods=['GET'])  # Dashboard para el administrador
@token_required
@admin_required
def obtener_diagnosticos_comunes(current_user):
    diagnosticos_comunes = get_diagnosticos_mas_comunes()  # Llama a la función correcta

    return diagnosticos_comunes  # Ya debe estar formateado como JSON y con el código de estado


@admin_bp.route('/obtener_estado_areas', methods=['GET'])  # Dashboard para el administrador
@token_required
@admin_required
def obtener_estado_areas(current_user):
    areas = get_estado_area()
    if not areas:
        return jsonify({"message": "No hay areas registradas."}), 200
    return jsonify(areas), 200


@admin_bp.route('/descargarPDF_area', methods=['GET'])  # Dashboard para el administrador
@token_required
@admin_required
def descargarPDF_area(current_user):
    areas = get_estado_area()
    if not areas:
        return jsonify({"message": "No hay areas registradas."}), 200
    pdf_buffer = generar_pdf_areas(areas)
    return send_file(pdf_buffer, as_attachment=True, download_name="reporte_estado_areas.pdf", mimetype='application/pdf')

@admin_bp.route('/descargar_reporte_pacientes', methods=['GET'])
@token_required
@admin_required
def descargar_reporte_pacientes():
    atendidos = get_pacientes_atendidos()
    pacientes_atendidos = obtener_pacientes_atendidos(atendidos)  # Asegúrate de tener esta función
    pdf_buffer = generar_pdf_pacientes_atendidos(pacientes_atendidos)
    return send_file(pdf_buffer, as_attachment=True, download_name="reporte_pacientes_atendidos.pdf", mimetype='application/pdf')

@admin_bp.route('/descargar_reporte_diagnosticos', methods=['GET'])
@token_required
@admin_required
def descargar_reporte_diagnosticos():
    diagnosticos_comunes_ = get_diagnosticos_mas_comunes()
    diagnosticos_comunes = obtener_diagnosticos_comunes(diagnosticos_comunes_)  # Asegúrate de tener esta función
    pdf_buffer = generar_pdf_diagnosticos_comunes(diagnosticos_comunes)
    return send_file(pdf_buffer, as_attachment=True, download_name="reporte_diagnosticos_comunes.pdf", mimetype='application/pdf')


@admin_bp.route('/descargarEXCEL_area', methods=['GET'])  # Dashboard para el administrador
@token_required
@admin_required
def descargarEXCEL_area(current_user):
    areas = get_estado_area()
    if not areas:
        return jsonify({"message": "No hay areas registradas."}), 200
    excel_buffer  = generar_excel_areas(areas)
    return send_file(excel_buffer, as_attachment=True, download_name="reporte_estado_areas.xlsx", mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

@admin_bp.route('/descargar_reporte_pacientes_excel', methods=['GET'])
@token_required
@admin_required
def descargar_reporte_pacientes_excel():
    pacientes_atendidos = obtener_pacientes_atendidos()  # Asegúrate de definir esta función
    excel_buffer = generar_excel_pacientes_atendidos(pacientes_atendidos)
    
    return send_file(excel_buffer, as_attachment=True, download_name="reporte_pacientes_atendidos.xlsx", mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

@admin_bp.route('/descargar_reporte_diagnosticos_excel', methods=['GET'])
@token_required
@admin_required
def descargar_reporte_diagnosticos_excel():
    diagnosticos_comunes = obtener_diagnosticos_comunes()
    excel_buffer = generar_excel_diagnosticos_comunes(diagnosticos_comunes)
    
    return send_file(excel_buffer, as_attachment=True, download_name="reporte_diagnosticos_comunes.xlsx", mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')



#agregar pacientearea (para llevar registro de los últimos pacientes ingresados)



#obtener pacientes sin area
@admin_bp.route('/pacientes_sin_area', methods=['GET'])
@token_required
@admin_required
def obtener_pacientes_sin_area(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Obtener lista de pacientes sin área asignada
        cursor.execute("""
            SELECT id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion
            FROM Paciente
            WHERE id_area IS NULL
        """)
        pacientes = cursor.fetchall()
        if not pacientes:
            return jsonify({"message": "No hay pacientes sin área asignada"}), 404
        lista_pacientes = [
            {
                "id_paciente": row[0],
                "nombre": row[1],
                "apellido": row[2],
                "dpi": row[3],
                "genero": row[4],
                "fecha_nacimiento": row[5].strftime("%Y-%m-%d"),
                "telefono": row[6],
                "direccion": row[7]
            } for row in pacientes
        ]
        return jsonify({"pacientes_sin_area": lista_pacientes}), 200
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()


@admin_bp.route('/enfermeras_disponibles', methods=['GET']) #verificar si esto tambien aplica para los doctores
@token_required
@admin_required
def listar_enfermeras_disponibles(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Obtener lista de enfermeras disponibles
        cursor.execute("""
            SELECT u.id_usuario, u.nombres, u.apellidos, u.correo, u.telefono, u.dpi, u.genero, u.direccion
            FROM Usuario u
            LEFT JOIN PacienteEnfermera pe ON u.id_usuario = pe.id_usuario
            WHERE u.fecha_vencimiento_colegiado IS NULL
              AND u.id_rol = ?
              AND pe.id_usuario IS NULL  -- Enfermera no asignada a ningún paciente
        """, (3,))  # Asume que id_rol = 3 corresponde a enfermeras
        enfermeras = cursor.fetchall()
        if not enfermeras:
            return jsonify({"message": "No hay enfermeras disponibles"}), 404
        # Formatear resultado en JSON
        lista_enfermeras = [
            {
                "id_usuario": row[0],
                "nombres": row[1],
                "apellidos": row[2],
                "correo": row[3],
                "telefono": row[4],
                "dpi": row[5],
                "genero": row[6],
                "direccion": row[7]
            } for row in enfermeras
        ]
        return jsonify({"enfermeras_disponibles": lista_enfermeras}), 200
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

@admin_bp.route('/agregar_paciente_area', methods=['POST'])
@token_required
@admin_required
def asignar_area_a_paciente(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Obtener datos del cuerpo de la solicitud
        data = request.get_json()
        id_paciente = data.get('id_paciente')
        id_area = data.get('id_area')
        id_enfermera = data.get('id_enfermera')
        id_doctor = data.get('id_doctor')

        # Validar que los datos requeridos estén presentes
        if not all([id_paciente, id_area, id_enfermera, id_doctor]):
            return jsonify({"error": "Faltan datos necesarios (id_paciente, id_area, id_enfermera, id_doctor)"}), 400

        # Validar que id_enfermera corresponde a una enfermera
        cursor.execute("""
            SELECT id_usuario FROM Usuario
            WHERE id_usuario = ? AND fecha_vencimiento_colegiado IS NULL AND id_rol = ?
        """, (id_enfermera, 3))
        enfermera = cursor.fetchone()

        if not enfermera:
            return jsonify({"error": "El usuario seleccionado como enfermera no es válido"}), 400

        # Validar que id_doctor corresponde a un doctor
        cursor.execute("""
            SELECT id_usuario FROM Usuario
            WHERE id_usuario = ? AND fecha_vencimiento_colegiado IS NOT NULL AND id_rol = ?
        """, (id_doctor, 2))
        doctor = cursor.fetchone()

        if not doctor:
            return jsonify({"error": "El usuario seleccionado como doctor no es válido"}), 400

        # Actualizar área, enfermera y doctor del paciente
        cursor.execute("""
            UPDATE Usuario
            SET id_area = ?, id_enfermera = ?, id_doctor = ?
            WHERE id_usuario = ?
        """, (id_area, id_enfermera, id_doctor, id_paciente))
        conn.commit()

        # Registrar el cambio en un historial
        cursor.execute("""
            INSERT INTO PacienteHistorico (
                tipo_modificacion, fecha_insercion, id_paciente, nombre, apellido, dpi, genero,
                fecha_nacimiento, telefono, direccion, id_area, estado
            )
            SELECT 'Asignación de Área', GETDATE(), id_usuario, nombres, apellidos, dpi, genero,
                   fecha_ingreso, telefono, direccion, ?, estado
            FROM Usuario
            WHERE id_usuario = ?
        """, (id_area, id_paciente))
        conn.commit()

        return jsonify({"message": "Paciente asignado a área, enfermera y doctor exitosamente"}), 200

    except pyodbc.IntegrityError as e:
        return jsonify({"error": f"Error en la integridad de la base de datos: {str(e)}"}), 400

    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

    finally:
        cursor.close()
        conn.close()


@admin_bp.route('/ultimos_pacientes_ingresados', methods=['GET'])
@token_required
@admin_required
def ultimos_pacientes_ingresados(current_user):
    # Obtener el límite de registros desde el query string (opcional)
    limite = request.args.get('limite', 10, type=int)

    conn = get_db_connection_SQLSERVER()
    if conn is None:
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500

    cursor = conn.cursor()
    try:
        # Consulta para obtener los últimos pacientes ingresados
        cursor.execute("""
            SELECT TOP (?) id_paciente, nombre, apellido, dpi, genero, fecha_nacimiento, telefono, direccion, id_area, estado, fecha_insercion
            FROM PacienteHistorico
            WHERE tipo_modificacion = 'Asignación a Área'
            ORDER BY fecha_insercion DESC
        """, (limite,))
        pacientes = cursor.fetchall()

        if not pacientes:
            return jsonify({"message": "No se encontraron registros de pacientes ingresados"}), 404

        # Construir la lista de pacientes en formato JSON
        lista_pacientes = [
            {
                "id_paciente": row[0],
                "nombre": row[1],
                "apellido": row[2],
                "dpi": row[3],
                "genero": row[4],
                "fecha_nacimiento": row[5],
                "telefono": row[6],
                "direccion": row[7],
                "id_area": row[8],
                "estado": row[9],
                "fecha_insercion": row[10].strftime("%Y-%m-%d %H:%M:%S")  # Formato de fecha
            } for row in pacientes
        ]

        return jsonify({
            "message": f"Últimos {limite} pacientes ingresados encontrados",
            "pacientes": lista_pacientes
        }), 200

    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

    finally:
        cursor.close()
        conn.close()