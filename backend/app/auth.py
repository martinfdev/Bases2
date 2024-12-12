from flask import Blueprint, request, jsonify, current_app
import re
import bcrypt
import pyodbc
import jwt
from app.connection import get_db_connection
from app.decorators import token_required
auth_bp = Blueprint('auth', __name__)

email_regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

@auth_bp.route('/register', methods=['POST'])
def register_user():
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
    conn = get_db_connection()
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
    

@auth_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    if 'identificador' not in data or 'contrasena' not in data:
        return jsonify({"error": "Nombre de usuario/correo y contraseña son requeridos"}), 400
    identificador = data['identificador']  # Puede ser el correo o dpi
    contrasena = data['contrasena']
    conn = get_db_connection()
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
        return jsonify({"message": "Login exitoso", "token": token}), 200
    else:
        return jsonify({"Error": "Correo/DPI o contraseña son inválidos"}), 401
    

@auth_bp.route('/me', methods=['GET'])
@token_required
def decoder(current_user):
    id_user = current_user['id_usuario']
    dpi = current_user['dpi']
    conn = get_db_connection()
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