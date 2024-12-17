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

email_regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'



@enfermera_bp.route('/lista_pacientes', methods=['GET'])
@token_required
@enfermera_required
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
            #save_log_param("consulta", "ERROR", "lista_pacientes", "Admin_Controller", "No hay usuarios disponibles")
            return jsonify({"Error": "No hay usuarios disponibles"}), 409
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
