from flask import Blueprint, jsonify, request
from CONFIG.connection import get_db_connection_SQLSERVER
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


@doctor_bp.route('/lista_pacientes', methods=['GET'])
@token_required
@doctor_required
def lista_pacientes(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        save_log_param("consulta", "ERROR", "lista_pacientes", "Doctor_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT * FROM Paciente')
        user = cursor.fetchall()
        if not user:
            save_log_param("consulta", "ERROR", "lista_pacientes", "Doctor_Controller", "No hay usuarios disponibles")
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
        save_log_param("consulta", "INFO", "lista_pacientes", "Doctor_Controller", "Exito, Consulta Realizada")
        return jsonify({
            "message": "Pacientes encontrados",
            "paciente": lista_usuarios
        }), 200
    except pyodbc.IntegrityError as e:
        save_log_param("consulta", "ERROR", "lista_pacientes", "Doctor_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        save_log_param("consulta", "ERROR", "lista_pacientes", "Doctor_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@doctor_bp.route('/consulta_paciente', methods=['POST'])
@token_required
@doctor_required
def consulta_paciente(current_user):
    data = request.get_json()
    field = 'dpi'
    if field not in data:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Doctor_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    dpi = data['dpi']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Doctor_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM Paciente WHERE dpi = ? AND estado = 1', (dpi))
        nombre_exists = cursor.fetchone()

        cursor.execute('SELECT * FROM area WHERE id_area = ?', (nombre_exists[8]))
        area_exist = cursor.fetchone()
        if not nombre_exists:
            #save_log_param("consulta", "ERROR", "consulta_paciente", "Doctor_Controller", "Area no existe")
            return jsonify({"Error": "Paciente no existe"}), 409
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
        #save_log_param("consulta", "INFO", "consulta_paciente", "Doctor_Controller", "Exito, Area Eliminada Correctamente")
        return jsonify({"paciente": paciente}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Doctor_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "consulta_paciente", "Doctor_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

