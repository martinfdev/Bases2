from flask import Blueprint, jsonify, request
from CONFIG.connection import get_db_connection_SQLSERVER
from CONFIG.decorators import token_required, doctor_required
import bcrypt
import pyodbc
import re
from datetime import datetime
#from REDIS.logs import save_log_param
doctor_bp = Blueprint('doctor', __name__)

@doctor_bp.route('/dashboard', methods=['GET']) #dashbord para el administrador
@token_required
@doctor_required
def admin_route(current_user):
    print(current_user)
    return jsonify({"message": f"Welcome doctor, user {current_user['nombres']}!"}), 200

@doctor_bp.route('/lista_area', methods=['GET'])
@token_required
@doctor_required
def lista_area(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_paramm("consulta", "ERROR", "lista_area", "Doctor_Controller", "Error al conectarse con la base de datos")
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
            #save_log_paramm("consulta", "ERROR", "lista_area", "Doctor_Controller", "No hay usuarios disponibles")
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
        #save_log_paramm("consulta", "INFO", "lista_area", "Doctor_Controller", "Exito, Consulta Realizada")
        return jsonify({
            "message": "Areas encontrados",
            "paciente": lista_areas
        }), 200
    except pyodbc.IntegrityError as e:
        #save_log_paramm("consulta", "ERROR", "lista_area", "Doctor_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_paramm("consulta", "ERROR", "lista_area", "Doctor_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

@doctor_bp.route('/lista_pacientes', methods=['GET'])
@token_required
@doctor_required
def lista_pacientes(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "lista_pacientes", "Doctor_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT * FROM Paciente')
        user = cursor.fetchall()
        if not user:
            #save_log_param("consulta", "ERROR", "lista_pacientes", "Doctor_Controller", "No hay usuarios disponibles")
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
        #save_log_param("consulta", "INFO", "lista_pacientes", "Doctor_Controller", "Exito, Consulta Realizada")
        return jsonify({
            "message": "Pacientes encontrados",
            "paciente": lista_usuarios
        }), 200
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "lista_pacientes", "Doctor_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "lista_pacientes", "Doctor_Controller", "Error inesperado")
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

@doctor_bp.route('/editar_paciente', methods=['PUT'])
@token_required
@doctor_required
def editar_paciente(current_user):
    data = request.get_json()
    required_fields = ['nombre','apellido','dpi','fecha_nacimiento','telefono','direccion','id_area']
    for field in required_fields:
        if field not in data:
            #save_log_param("edicion", "ERROR", "editar_paciente", "Doctor_Controller", f"Field {field} is required")
            return jsonify({"error": f"Field {field} is required"}), 400
    nombre = data['nombre']
    apellido = data['apellido']
    dpi = data['dpi']
    fecha_nacimiento = data['fecha_nacimiento']
    telefono = data['telefono']
    direccion = data['direccion']
    id_area = data['id_area']
    conn = get_db_connection_SQLSERVER()
    #CONVERSION DE FECHA
    try:
        fecha_nacimiento = datetime.strptime(fecha_nacimiento, '%d-%m-%Y').strftime('%Y-%m-%d')
    except ValueError:
        pass
    if conn is None:
        #save_log_param("edicion", "ERROR", "editar_paciente", "Doctor_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM paciente WHERE dpi = ?', (dpi))
        paciente_exists = cursor.fetchone()
        if not paciente_exists:
            #save_log_param("edicion", "ERROR", "editar_paciente", "Doctor_Controller", "Paciente no existe")
            return jsonify({"Error": "Paciente no existe"}), 409
        #VALIDAR EL AREA SI EXISTE
        cursor.execute('SELECT * FROM Area WHERE id_area = ?', (id_area))
        area_exists = cursor.fetchone()
        if not area_exists:
            #save_log_param("edicion", "ERROR", "editar_paciente", "Doctor_Controller", "Area no existe")
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
        #save_log_param("edicion", "INFO", "editar_paciente", "Doctor_Controller", "Exito, Paciente editado Correctamente")
        return jsonify({"message": "Paciente editado Correctamente"}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("edicion", "ERROR", "editar_paciente", "Doctor_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("edicion", "ERROR", "editar_paciente", "Doctor_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()


@doctor_bp.route('/listadpPacientes_asignados', methods=['GET'])
@token_required
@doctor_required
def dashboard_doctor(current_user):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Obtener la lista de pacientes asignados al doctor actual
        cursor.execute("""
            SELECT p.id_paciente, p.nombre, p.apellido, p.dpi, p.genero, p.fecha_nacimiento, 
                   p.telefono, p.direccion, p.estado, a.nombre_area
            FROM PacienteEnfermera pe
            INNER JOIN Paciente p ON pe.id_paciente = p.id_paciente
            INNER JOIN Area a ON p.id_area = a.id_area
            WHERE pe.id_usuario = ?
        """, (current_user['id_usuario'],))
        pacientes = cursor.fetchall()
        # Si no hay pacientes asignados
        if not pacientes:
            return jsonify({"pacientes_asignados": "No hay pacientes asignados."}), 200
        # Formatear resultado en JSON
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
                "estado": row[8],
                "area": row[9]
            } for row in pacientes
        ]
        return jsonify({"pacientes_asignados": lista_pacientes}), 200
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()


@doctor_bp.route('/DarDeAlta/<int:id_paciente>', methods=['DELETE'])
@token_required
@doctor_required
def dar_de_alta(current_user, id_paciente):
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500

    cursor = conn.cursor()

    try:
        # Verificar si el paciente existe en la tabla PacienteEnfermera
        cursor.execute("""
            SELECT 1 
            FROM PacienteEnfermera 
            WHERE id_paciente = ?
        """, (id_paciente,))
        paciente_existente = cursor.fetchone()

        if not paciente_existente:
            return jsonify({
                "error": "El paciente no tiene asignaciones o no existe."
            }), 404

        # Eliminar todas las referencias al paciente en PacienteEnfermera
        cursor.execute("""
            DELETE FROM PacienteEnfermera 
            WHERE id_paciente = ?
        """, (id_paciente,))
        conn.commit()

        return jsonify({
            "message": f"El paciente con ID {id_paciente} ha sido dado de alta exitosamente. Se eliminaron todas las referencias."
        }), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500

    finally:
        cursor.close()
        conn.close()

@doctor_bp.route('/validar_vencimiento_colegiado', methods=['POST'])
@token_required
@doctor_required
def validar_vencimiento_colegiado(current_user):
    data = request.get_json()
    field = 'dpi'
    if field not in data:
        #save_log_param("consulta", "ERROR", "validar_vencimiento_colegiado", "Doctor_Controller", f"Field {field} is required")
        return jsonify({"error": f"Field {field} is required"}), 400
    dpi = data['dpi']
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        #save_log_param("consulta", "ERROR", "validar_vencimiento_colegiado", "Doctor_Controller", "Error al conectarse con la base de datos")
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        # Verificar si area existe
        cursor.execute('SELECT * FROM Usuario WHERE dpi = ? AND estado = 1', (dpi))
        nombre_exists = cursor.fetchone()
        if not nombre_exists:
            #save_log_param("consulta", "ERROR", "validar_vencimiento_colegiado", "Doctor_Controller", "Usuario no existe")
            return jsonify({"Error": "Usuario no existe"}), 409
        fecha_base = datetime.strptime(str(nombre_exists[12]), "%Y-%m-%d")
        fecha_actual = datetime.now()
        diferencia = (fecha_base - fecha_actual).days
        cursor.close()
        conn.close()
        #save_log_param("consulta", "INFO", "validar_vencimiento_colegiado", "Doctor_Controller", "Exito, Consulta Realizada con exito")
        return jsonify({"dias_restantes": diferencia}), 201
    except pyodbc.IntegrityError as e:
        #save_log_param("consulta", "ERROR", "validar_vencimiento_colegiado", "Doctor_Controller", "Error en la integridad de la base de datos: " + str(e))
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        #save_log_param("consulta", "ERROR", "validar_vencimiento_colegiado", "Doctor_Controller", "Error inesperado")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
