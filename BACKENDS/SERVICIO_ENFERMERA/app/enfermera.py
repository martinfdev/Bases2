from flask import Blueprint, jsonify, request
from CONFIG.connection import get_db_connection_SQLSERVER
from CONFIG.decorators import token_required, enfermera_required
import bcrypt
import pyodbc
import re
#from REDIS.logs import save_log_param
enfermera_bp = Blueprint('enfermera', __name__)

@enfermera_bp.route('/dashboard', methods=['GET']) #dashbord para el administrador
@token_required
@enfermera_required
def admin_route(current_user):
    print(current_user)
    return jsonify({"message": f"Welcome enfermera, user {current_user['nombres']}!"}), 200

email_regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

@enfermera_bp.route('/lista_pacientes', methods=['GET'])
@token_required
@enfermera_required
def lista_pacientes(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "lista_pacientes", "Enfermera_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT * FROM Paciente')
        user = cursor.fetchall()
        if not user:
            #save_log_param("consulta", "INFO", "lista_pacientes", "Enfermera_Controller", "No hay usuarios disponibles")
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
        #save_log_param("consulta", "INFO", "lista_pacientes", "Enfermera_Controller", "Exito, Consulta Realizada")
        return jsonify({
            "message": "Pacientes encontrados",
            "paciente": lista_usuarios
        }), 200
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "lista_pacientes", "Enfermera_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "lista_pacientes", "Enfermera_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@enfermera_bp.route('/consulta_paciente', methods=['POST'])
@token_required
@enfermera_required
def consulta_paciente(current_user):
    data = request.get_json()
    field = 'dpi'
    if field not in data:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Enfermera_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    dpi = data['dpi']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Enfermera_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM Paciente WHERE dpi = ? AND estado = 1', (dpi))
        nombre_exists = cursor.fetchone()
        if(not nombre_exists):
            #save_log_param("consulta", "ERROR", "consulta_paciente", "Enfermera_Controller", "Paciente no existe")
            return jsonify({"Error": "paciente no existe"}), 409

        cursor.execute('SELECT * FROM area WHERE id_area = ?', (nombre_exists[8]))
        area_exist = cursor.fetchone()
        if not nombre_exists:
            #save_log_param("consulta", "ERROR", "consulta_paciente", "Enfermera_Controller", "area no existe")
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
        #save_log_param("consulta", "INFO", "consulta_paciente", "Enfermera_Controller", "Exito, Consulta realizada Correctamente")
        return jsonify({"paciente": paciente}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Enfermera_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Enfermera_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@enfermera_bp.route('/editar_paciente', methods=['PUT'])
@token_required
@enfermera_required
def editar_paciente(current_user):
    data = request.get_json()
    required_fields = ['nombre','apellido','dpi','fecha_nacimiento','telefono','direccion','id_area']
    for field in required_fields:
        if field not in data:
            #save_log_param("edicion", "ERROR", "editar_paciente", "Enfermera_Controller", f"Field {field} is required")
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
        #save_log_param("edicion", "ERROR", "editar_paciente", "Enfermera_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM paciente WHERE dpi = ?', (dpi))
        paciente_exists = cursor.fetchone()
        if not paciente_exists:
            #save_log_param("edicion", "ERROR", "editar_paciente", "Enfermera_Controller", "Paciente no existe")
            return jsonify({"Error": "Paciente no existe"}), 409
        #VALIDAR EL AREA SI EXISTE
        cursor.execute('SELECT * FROM Area WHERE id_area = ?', (id_area))
        area_exists = cursor.fetchone()
        if not area_exists:
            #save_log_param("edicion", "ERROR", "editar_paciente", "Enfermera_Controller", "Area no existe")
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
        #save_log_param("edicion", "INFO", "editar_paciente", "Enfermera_Controller", "Exito, Area registrada Correctamente")
        return jsonify({"message": "Paciente editado Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("edicion", "ERROR", "editar_paciente", "Enfermera_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("edicion", "ERROR", "editar_paciente", "Enfermera_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()
