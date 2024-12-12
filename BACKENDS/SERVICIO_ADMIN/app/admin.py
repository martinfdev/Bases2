from flask import Blueprint, jsonify, request
from CONFIG.connection import get_db_connection_SQLSERVER
from CONFIG.decorators import token_required, admin_required
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


email_regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

@admin_bp.route('/register', methods=['POST'])
@token_required
@admin_required
def register_user(current_user):
    data = request.get_json()
    required_fields = ['nombres','apellidos','correo','contrasena','id_rol','telefono','dpi','genero','direccion','fecha_ingreso','id_especialidad','fecha_vencimiento_colegiado','estado']
    for field in required_fields:
        if field not in data:
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
        return jsonify({"Error": "El correo no tiene el formato adecuado"}), 400
    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(contrasena.encode('utf-8'), bcrypt.gensalt())
    #connection db
    conn = get_db_connection_SQLSERVER()
    if conn is None:
        return jsonify({"error": "Error al conectarse con la base de datos"}), 500
    cursor = conn.cursor()
    try:
        print("entro al try")
        # Verificar si el email o dpi ya exite
        cursor.execute('SELECT * FROM Usuario WHERE dpi = ? OR correo = ?', (dpi, correo))
        user_exists = cursor.fetchone()
        if user_exists:
            return jsonify({"Error": "El correo electronico/dpi ya existe"}), 409
        # Inserción de datos en la tabla Usuarios
        print(cursor)
        cursor.execute(''' INSERT INTO Usuario (nombres, apellidos, correo, contrasena, id_rol, telefono, dpi, genero ,direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado)
                        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
                       ''',(nombres, apellidos, correo, hashed_password.decode('utf-8'), id_rol, telefono, dpi, genero, direccion, fecha_ingreso, id_especialidad, fecha_vencimiento_colegiado, estado))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Usuario registrado correctamente"}), 201
    except pyodbc.IntegrityError as e:
        return jsonify({"Error": "Error en la integridad de la base de datos: " + str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    





'''

BAKEND
---SERVICIO_AUTH
---SERVICIO_REDIS
---SERVICIO_ADMIN
---SERVICIO_DOCTOR
---SERVICIO_ENFERMERA


'''