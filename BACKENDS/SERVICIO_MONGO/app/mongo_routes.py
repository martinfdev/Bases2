from flask import Blueprint, jsonify, request
from pymongo import MongoClient, errors
from pymongo.errors import PyMongoError, OperationFailure, DuplicateKeyError
import bcrypt
import pyodbc
import re
from dotenv import load_dotenv
import os
from .mongo_connection import get_db_connection_MONGODB
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
import sys
import os
config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
sys.path.append(config_path)
from CONFIG.connection import get_db_connection_SQLSERVER
from datetime import datetime
import json
base_mongo = Blueprint('mongo', __name__)

#from REDIS.logs import save_log_param
load_dotenv()



@base_mongo.route('/crear_expediente', methods=['POST']) 
def crear_expediente():
    data = request.get_json()
    if not data:
        #save_log_param("insercion", "ERROR", "crear_expediente", "Mongo_Controller", "No se recibieron datos sobre el expediente.")
        return jsonify({"error": "No se recibieron datos sobre el expediente."}), 400
    dpi = data.get("_id")
    if not dpi:
        #save_log_param("insercion", "ERROR", "crear_expediente", "Mongo_Controller", "El DPI del paciente es requerido.")
        return jsonify({"error": "El DPI del paciente es requerido."}), 400
    
    cliente = get_db_connection_MONGODB()
    if cliente is None:
        #save_log_param("insercion", "ERROR", "crear_expediente", "Mongo_Controller", f"Error.No se pudo conectar a la base de datos Mongo!")
        return jsonify({"message": f"Error.No se pudo conectar a la base de datos Mongo!"}), 409
    try:
        MONGO_DB = os.getenv("MONGO_DB")
        MONGO_COLLECTION =  os.getenv("MONGO_COLLECTION") 
        db = cliente[MONGO_DB]
        expedientes = db[MONGO_COLLECTION]

        #BUSCAR EXPEDIENTE EXISTENTE
        if expedientes.find_one({"_id": dpi}):
            #save_log_param("insercion", "ERROR", "crear_expediente", "Mongo_Controller", f"Ya existe un expediente del paciente con DPI: {dpi}.")
            return jsonify({"error": f"Ya existe un expediente del paciente con DPI: {dpi}."}), 400
        
        result = expedientes.insert_one(data)
        #save_log_param("insercion", "INFO", "crear_expediente", "Mongo_Controller", f"Documento insertado con ID: {result.inserted_id}")
        return jsonify({"message": f"Documento insertado con ID: {result.inserted_id}"}), 201
    except DuplicateKeyError as e:
        #save_log_param("insercion", "ERROR", "crear_expediente", "Mongo_Controller", "Ya existe un expediente para este paciente!")
        return jsonify({"Error": "Ya existe un expediente para este paciente!"}), 400
    except OperationFailure as e:
        #save_log_param("insercion", "ERROR", "crear_expediente", "Mongo_Controller", "Error de operación en MongoDB: " + str(e))
        return jsonify({"Error": "Error de operación en MongoDB: " + str(e)}), 400
    except PyMongoError as e:
        #save_log_param("insercion", "ERROR", "crear_expediente", "Mongo_Controller", "Error en la base de datos MongoDB: " + str(e))
        return jsonify({"Error": "Error en la base de datos MongoDB: " + str(e)}), 500
    except Exception as e:
        #save_log_param("insercion", "ERROR", "crear_expediente", "Mongo_Controller", f"Error inesperado: {str(e)}")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cliente.close()


@base_mongo.route('/nuevo_ingreso', methods=['POST']) 
def nuevo_ingreso():
    data = request.get_json()
    if not data:
        #save_log_param("insercion", "ERROR", "nuevo_ingreso", "Mongo_Controller", "No se recibieron datos sobre el expediente. ") 
        return jsonify({"error": "No se recibieron datos sobre el expediente."}), 400
    dpi = data.get("_id")
    data_ingreso = data.get("contenido")
    if not dpi:
        #save_log_param("insercion", "ERROR", "nuevo_ingreso", "Mongo_Controller", "El DPI del paciente es requerido.") 
        return jsonify({"error": "El DPI del paciente es requerido."}), 400
    if not data_ingreso:
        #save_log_param("insercion", "ERROR", "nuevo_ingreso", "Mongo_Controller", "El Contenido del ingreso de paciente es requerido.") 
        return jsonify({"error": "El Contenido del ingreso de paciente es requerido."}), 400
    cliente = get_db_connection_MONGODB()
    if cliente is None:
        #save_log_param("insercion", "ERROR", "nuevo_ingreso", "Mongo_Controller", "Error.No se pudo conectar a la base de datos Mongo!") 
        return jsonify({"message": f"Error.No se pudo conectar a la base de datos Mongo!"}), 409
    try:
        MONGO_DB = os.getenv("MONGO_DB")
        MONGO_COLLECTION =  os.getenv("MONGO_COLLECTION") 
        db = cliente[MONGO_DB]
        expedientes = db[MONGO_COLLECTION]

        #BUSCAR EXPEDIENTE EXISTENTE
        exped = expedientes.find_one({"_id": dpi})
        if not exped:
            #save_log_param("insercion", "ERROR", "nuevo_ingreso", "Mongo_Controller", f"No existe un expediente del paciente con DPI: {dpi}.") 
            return jsonify({"error": f"No existe un expediente del paciente con DPI: {dpi}."}), 400
        
        result = expedientes.update_one(
            {"_id": dpi},
            {"$push": {"historialIngresos": data_ingreso}}
        )
        print(f"Ingreso Registrado con Exito")
        #save_log_param("insercion", "INFO", "nuevo_ingreso", "Mongo_Controller", "Ingreso insertado con exito") 
        return jsonify({"message": f"Ingreso insertado con exito"}), 201
    except OperationFailure as e:
        #save_log_param("insercion", "ERROR", "nuevo_ingreso", "Mongo_Controller", "Error de operación en MongoDB: " + str(e)) 
        return jsonify({"Error": "Error de operación en MongoDB: " + str(e)}), 400
    except PyMongoError as e:
        #save_log_param("insercion", "ERROR", "nuevo_ingreso", "Mongo_Controller", "Error en la base de datos MongoDB: " + str(e)) 
        return jsonify({"Error": "Error en la base de datos MongoDB: " + str(e)}), 500
    except Exception as e:
        #save_log_param("insercion", "ERROR", "nuevo_ingreso", "Mongo_Controller", f"Error inesperado: {str(e)}") 
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cliente.close()


@base_mongo.route('/obtener_expediente', methods=['POST']) 
def obtener_expediente():
    data = request.get_json()
    dpi = data.get("dpi")
    if not dpi:
        #save_log_param("consulta", "ERROR", "obtener_expediente", "Mongo_Controller", "El DPI del paciente es requerido.")
        return jsonify({"error": "El DPI del paciente es requerido."}), 400
    cliente = get_db_connection_MONGODB()
    if cliente is None:
        #save_log_param("consulta", "ERROR", "obtener_expediente", "Mongo_Controller", "No se pudo conectar a la base de datos Mongo!")
        return jsonify({"message": f"Error.No se pudo conectar a la base de datos Mongo!"}), 409
    try:
        MONGO_DB = os.getenv("MONGO_DB")
        MONGO_COLLECTION =  os.getenv("MONGO_COLLECTION") 
        db = cliente[MONGO_DB]
        expedientes = db[MONGO_COLLECTION]

        #BUSCAR EXPEDIENTE EXISTENTE
        exped = expedientes.find_one({"_id": dpi})
        if not exped:
            #save_log_param("consulta", "ERROR", "obtener_expediente", "Mongo_Controller", "No existe un expediente del paciente con DPI: {dpi}.")
            return jsonify({"error": f"No existe un expediente del paciente con DPI: {dpi}."}), 400  
        #save_log_param("consulta", "INFO", "obtener_expediente", "Mongo_Controller", "Expediente Obtenido") 
        return jsonify({"message": "Expediente Obtenido", "expediente": exped}), 201
    except OperationFailure as e:
        #save_log_param("consulta", "ERROR", "obtener_expediente", "Mongo_Controller", "Error de operación en MongoDB: " + str(e))
        return jsonify({"Error": "Error de operación en MongoDB: " + str(e)}), 400
    except PyMongoError as e:
        #save_log_param("consulta", "ERROR", "obtener_expediente", "Mongo_Controller", "Error en la base de datos MongoDB: " + str(e))
        return jsonify({"Error": "Error en la base de datos MongoDB: " + str(e)}), 500
    except Exception as e:
        #save_log_param("consulta", "ERROR", "obtener_expediente", "Mongo_Controller", f"Error inesperado: {str(e)}")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cliente.close()

@base_mongo.route('/obtener_diagnosticos_comunes', methods=['POST'])
def obtener_diagnosticos_comunes():
    #data = request.get_json()
    cliente = get_db_connection_MONGODB()
    if cliente is None:
        #save_log_param("consulta", "ERROR", "obtener_diagnosticos_comunes", "Mongo_Controller", "No se pudo conectar a la base de datos Mongo!")
        return jsonify({"message": "Error. No se pudo conectar a la base de datos Mongo!"}), 409
    try:
        MONGO_DB = os.getenv("MONGO_DB")
        MONGO_COLLECTION = os.getenv("MONGO_COLLECTION")
        db = cliente[MONGO_DB]
        expedientes = db[MONGO_COLLECTION]
        
        # Crear el pipeline de agregación para obtener los diagnósticos más comunes
        pipeline = [
            {
                "$unwind": "$diagnosticos"  # Descomponer el campo 'diagnosticos'
            },
            {
                "$group": {
                    "_id": "$diagnosticos",  # Agrupar por diagnóstico
                    "frecuencia": {"$sum": 1}  # Contar la cantidad de veces que aparece cada diagnóstico
                }
            },
            {
                "$sort": {"frecuencia": -1}  # Ordenar por frecuencia (de mayor a menor)
            },
            {
                "$limit": 10  # Limitar los resultados a los 10 diagnósticos más comunes
            }
        ]
        
        # Ejecutar el pipeline de agregación
        resultados = list(expedientes.aggregate(pipeline))
        
        # Si no hay resultados, se devuelve un mensaje adecuado
        if not resultados:
            #save_log_param("consulta", "ERROR", "obtener_diagnosticos_comunes", "Mongo_Controller", "No se encontraron diagnósticos comunes.")
            return jsonify({"message": "No se encontraron diagnósticos comunes."}), 404
        diagnosticos_comunes = {
            "diagnosticos": [
                {
                    "diagnostico": resultado["_id"],
                    "frecuencia": resultado["frecuencia"]
                }
                for resultado in resultados
            ]
        }
        #save_log_param("consulta", "ERROR", "obtener_diagnosticos_comunes", "Mongo_Controller", "Diagnósticos comunes obtenidos.")
        return jsonify(diagnosticos_comunes), 200

    except OperationFailure as e:
        #save_log_param("consulta", "ERROR", "obtener_diagnosticos_comunes", "Mongo_Controller", f"Error de operación en MongoDB: {str(e)}")
        return jsonify({"Error": f"Error de operación en MongoDB: {str(e)}"}), 400
    except PyMongoError as e:
        #save_log_param("consulta", "ERROR", "obtener_diagnosticos_comunes", "Mongo_Controller", f"Error en la base de datos MongoDB: {str(e)}")
        return jsonify({"Error": f"Error en la base de datos MongoDB: {str(e)}"}), 500
    except Exception as e:
        #save_log_param("consulta", "ERROR", "obtener_diagnosticos_comunes", "Mongo_Controller", f"Error inesperado: {str(e)}")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cliente.close()

@base_mongo.route('/modificar_expediente', methods=['PUT']) 
def modificar_expediente():
    data = request.get_json()
    if not data:
        #save_log_param("edicion", "ERROR", "modificar_expediente", "Mongo_Controller", "No se recibieron datos sobre el expediente.")
        return jsonify({"error": "No se recibieron datos sobre el expediente."}), 400
    dpi = data.get("_id")
    if not dpi:
        #save_log_param("edicion", "ERROR", "modificar_expediente", "Mongo_Controller", "El DPI del paciente es requerido.")
        return jsonify({"error": "El DPI del paciente es requerido."}), 400
    
    cliente = get_db_connection_MONGODB()
    if cliente is None:
        #save_log_param("edicion", "ERROR", "modificar_expediente", "Mongo_Controller", f"Error.No se pudo conectar a la base de datos Mongo!")
        return jsonify({"message": f"Error.No se pudo conectar a la base de datos Mongo!"}), 409
    try:
        MONGO_DB = os.getenv("MONGO_DB")
        MONGO_COLLECTION =  os.getenv("MONGO_COLLECTION") 
        db = cliente[MONGO_DB]
        expedientes = db[MONGO_COLLECTION]

        #BUSCAR EXPEDIENTE EXISTENTE
        exped = expedientes.find_one({"_id": dpi})
        if not exped:
            #save_log_param("edicion", "ERROR", "modificar_expediente", "Mongo_Controller", "No existe un expediente del paciente con DPI: {dpi}.")
            return jsonify({"error": f"No existe un expediente del paciente con DPI: {dpi}."}), 400 
        historial = exped.get("historialIngresos", [])
        data["historialIngresos"] = historial
        expedientes.update_one(
            {"_id": dpi},
            {"$set": data}
        )
        #save_log_param("edicion", "INFO", "modificar_expediente", "Mongo_Controller", f"Expediente del paciente con DPI {dpi} actualizado correctamente.")
        return jsonify({"message": f"Expediente del paciente con DPI {dpi} actualizado correctamente."}), 200
    except DuplicateKeyError as e:
        #save_log_param("edicion", "ERROR", "modificar_expediente", "Mongo_Controller", "Ya existe un expediente para este paciente!")
        return jsonify({"Error": "Ya existe un expediente para este paciente!"}), 400
    except OperationFailure as e:
        #save_log_param("edicion", "ERROR", "modificar_expediente", "Mongo_Controller", "Error de operación en MongoDB: " + str(e))
        return jsonify({"Error": "Error de operación en MongoDB: " + str(e)}), 400
    except PyMongoError as e:
        #save_log_param("edicion", "ERROR", "modificar_expediente", "Mongo_Controller", "Error en la base de datos MongoDB: " + str(e))
        return jsonify({"Error": "Error en la base de datos MongoDB: " + str(e)}), 500
    except Exception as e:
        #save_log_param("edicion", "ERROR", "modificar_expediente", "Mongo_Controller", f"Error inesperado: {str(e)}")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cliente.close()

@base_mongo.route('/agregar_notasCuidado', methods=['POST']) 
def agregar_notasCuidado_expediente():
    data = request.get_json()
    if not data:
        #save_log_param("insercion", "ERROR", "agregar_notasCuidado", "Mongo_Controller", "No se recibieron datos sobre el expediente.")
        return jsonify({"error": "No se recibieron datos sobre el expediente."}), 400
    dpi = data.get("_id")
    if not dpi:
        #save_log_param("insercion", "ERROR", "agregar_notasCuidado", "Mongo_Controller", "El DPI del paciente es requerido.")
        return jsonify({"error": "El DPI del paciente es requerido."}), 400
    data_ingreso = data.get("contenido")
    if not data_ingreso:
        #save_log_param("insercion", "ERROR", "agregar_notasCuidado", "Mongo_Controller", "El Contenido de la nota de cuidado de paciente es requerido.") 
        return jsonify({"error": "El Contenido de la nota de cuidado de paciente es requerido."}), 400
    
    cliente = get_db_connection_MONGODB()
    if cliente is None:
        #save_log_param("insercion", "ERROR", "agregar_notasCuidado", "Mongo_Controller", f"Error.No se pudo conectar a la base de datos Mongo!")
        return jsonify({"message": f"Error.No se pudo conectar a la base de datos Mongo!"}), 409
    try:
        MONGO_DB = os.getenv("MONGO_DB")
        MONGO_COLLECTION =  os.getenv("MONGO_COLLECTION") 
        db = cliente[MONGO_DB]
        expedientes = db[MONGO_COLLECTION]

        #BUSCAR EXPEDIENTE EXISTENTE
        exped = expedientes.find_one({"_id": dpi})
        if not exped:
            #save_log_param("consulta", "ERROR", "agregar_notasCuidado", "Mongo_Controller", "No existe un expediente del paciente con DPI: {dpi}.")
            return jsonify({"error": f"No existe un expediente del paciente con DPI: {dpi}."}), 400 

        if "notaCuidado" not in exped:
            expedientes.update_one(
                {"_id": dpi},
                {"$set": {"notaCuidado": []}}
            )
        expedientes.update_one(
            {"_id": dpi},
            {"$push": {"notaCuidado": data_ingreso}}
        )
        #save_log_param("insercion", "INFO", "agregar_notasCuidado", "Mongo_Controller", f"Nota de Cuidado Agregado Correctamente")
        return jsonify({"message": f"Nota de Cuidado Agregado Correctamente"}), 200
    except DuplicateKeyError as e:
        #save_log_param("insercion", "ERROR", "agregar_notasCuidado", "Mongo_Controller", "Ya existe un expediente para este paciente!")
        return jsonify({"Error": "Ya existe un expediente para este paciente!"}), 400
    except OperationFailure as e:
        #save_log_param("insercion", "ERROR", "agregar_notasCuidado", "Mongo_Controller", "Error de operación en MongoDB: " + str(e))
        return jsonify({"Error": "Error de operación en MongoDB: " + str(e)}), 400
    except PyMongoError as e:
        #save_log_param("insercion", "ERROR", "agregar_notasCuidado", "Mongo_Controller", "Error en la base de datos MongoDB: " + str(e))
        return jsonify({"Error": "Error en la base de datos MongoDB: " + str(e)}), 500
    except Exception as e:
        #save_log_param("insercion", "ERROR", "agregar_notasCuidado", "Mongo_Controller", f"Error inesperado: {str(e)}")
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cliente.close()

CREDENTIALS_FILE = "credentials.json"
SCOPES = ['https://www.googleapis.com/auth/drive']
BACKUP_DIR = '/backups/mongo'

def create_folder(service, folder_name, parent_folder_id=None):
    query = f"name = '{folder_name}' and mimeType = 'application/vnd.google-apps.folder'"
    if parent_folder_id:
        query += f" and '{parent_folder_id}' in parents"
    results = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute()
    items = results.get('files', [])

    if items: #SI YA EXISTE
        
        return items[0]['id']
    else:
        file_metadata = {
            'name': folder_name,
            'mimeType': 'application/vnd.google-apps.folder',
        }
        if parent_folder_id:
            file_metadata['parents'] = [parent_folder_id]
        folder = service.files().create(body=file_metadata, fields='id').execute()
        return folder.get('id')

def upload_to_google_drive(service, file_path, folder_id):
    try:
        file_metadata = {
            'name': os.path.basename(file_path),
            'parents': [folder_id]
        }
        media = MediaFileUpload(file_path, mimetype='application/octet-stream')  
        file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        return file.get('id')
    except Exception as e:
        raise RuntimeError(f"Error al subir archivo a Google Drive: {e}")

def obtener_credenciales():
    flow = InstalledAppFlow.from_client_secrets_file(
        'credentials.json', SCOPES)
    creds = flow.run_local_server(port=0)  # Esto abrirá una ventana para autorizar
    return creds

def cargar_creds():
    try:
        with open('token.json', 'r') as token_file:
            token_data = json.load(token_file)
        if isinstance(token_data, dict) :
            required_keys = ['token', 'refresh_token', 'client_id', 'client_secret']
            if all(key in token_data for key in required_keys):
                creds = Credentials.from_authorized_user_info(token_data)
                return creds
            else:
                print(f"Faltan claves en token_data. Se esperan las claves: {required_keys}")
                return None
        else:
            print("El archivo token.json no tiene el formato esperado.")
            return None
    
    except json.JSONDecodeError as e:
        print("Error al decodificar el JSON:", e)
        return None
    except Exception as e:
        print("Ocurrió un error inesperado:", e)
        return None

 
@base_mongo.route('/crear_backups', methods=['POST'])
def crear_backup_Mongo():
    status_mongo = "ERROR"
    status_sql = "ERROR"
    status_redis = "ERROR"
    #OBTENER CREDENCIALES POR PRIMERA VEZ
    '''creds = obtener_credenciales()
    with open('token.json', 'w') as token:
        token.write(creds.to_json())'''
    #BACKUP MONGO
    try:
        fecha_actual = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        cliente = get_db_connection_MONGODB() #CONEXION A MONGO
        if cliente is not None:
            try:
                MONGO_DB = os.getenv("MONGO_DB")
                MONGO_COLLECTION =  os.getenv("MONGO_COLLECTION") 
                db = cliente[MONGO_DB]
                expedientes = db[MONGO_COLLECTION]
                documentos = list(expedientes.find({}))#OBTENER TODOS LOS EXPEDIENTES
                archivo_respaldo = f"backup_{MONGO_COLLECTION}_{fecha_actual}.json" #GUARDAR DATA EN ARCHIVO JSON
                with open(archivo_respaldo, 'w', encoding='utf-8') as f:
                    json.dump(documentos, f, default=str, ensure_ascii=False, indent=4)
                    f.close()
            except OperationFailure as e:
                #save_log_param("consulta", "ERROR", "crear_backup_Mongo", "Mongo_Controller", "Error de operación en MongoDB: " + str(e))
                return jsonify({"Error": "Error de operación en MongoDB: " + str(e)}), 400
            except PyMongoError as e:
                #save_log_param("consulta", "ERROR", "crear_backup_Mongo", "Mongo_Controller", "Error en la base de datos MongoDB: " + str(e))
                return jsonify({"Error": "Error en la base de datos MongoDB: " + str(e)}), 500
            except Exception as e:
                #save_log_param("consulta", "ERROR", "crear_backup_Mongo", "Mongo_Controller", f"Error inesperado: {str(e)}")
                return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
            finally:
                cliente.close()
    except:
        print("ERROR CONECTANDOSE A MONGO")

    #BACKUP SQL SERVER
    conn = get_db_connection_SQLSERVER()
    if conn is not None:
        cursor = conn.cursor()
        try:
            databasesql = os.getenv("DATABASESQL")
            backup_path_sql = os.getenv("RUTA_TEMPORAL") 
            backup_path_sql_FILE = f"{backup_path_sql}backup_{fecha_actual}.bak"
            print(databasesql)
            print(backup_path_sql_FILE)
            backup_query = f"""
                BACKUP DATABASE {databasesql}
                TO DISK = '{backup_path_sql_FILE}'
                """
            cursor.execute(backup_query)
            error_message = cursor.messages
            if error_message:
                print(f"Mensajes de error: {error_message}")
            conn.commit()
            cursor.close()
            conn.close()
            if not os.path.exists(backup_path_sql_FILE):
                print(f"Error: OCURRIO UN ERROR AL CREAR BACKUP SQL")
            #print(f"Backup de la base de datos {databasesql} realizado con éxito en {backup_path_sql}.")
        except Exception as e:
            print(f"Error al realizar el backup: {e}")


    #SUBIR ARCHIVOS
    creds = cargar_creds()
    if creds is None:
        #save_log_param("consulta", "ERROR", "crear_backup_Mongo", "Mongo_Controller", "Ocurrio un error con las credenciales")
        return jsonify({"Error": "Ocurrio un error con las credenciales"}), 400
    service = build('drive', 'v3', credentials=creds)
    backup_folder_id = create_folder(service, 'backups')
    mongo_folder_id = create_folder(service, 'mongo', backup_folder_id)
    sql_folder_id = create_folder(service, 'sql', backup_folder_id)

    file_sql_id = ""
    file_mongo_id = ""
    if(mongo_folder_id):
        if not os.path.exists(archivo_respaldo):
            print(f"Error: El archivo {archivo_respaldo} no existe.")
        file_mongo_id = upload_to_google_drive(service, archivo_respaldo, mongo_folder_id)
        os.remove(archivo_respaldo)#borrar el archivo local
        status_mongo = "EXITO"

    if(sql_folder_id):
        if not os.path.exists(backup_path_sql_FILE):
            print(f"Error: El archivo {backup_path_sql_FILE} no existe.")
        else:
            file_sql_id = upload_to_google_drive(service, backup_path_sql_FILE, sql_folder_id)
            status_sql = "EXITO"
    #save_log_param("consulta", "INFO", "crear_backup_Mongo", "Mongo_Controller", "Backups creado con exito") 
    return jsonify({"mongo_status": status_mongo, "file_mongo_id": file_mongo_id, "sql_status": status_sql,"file_sql_id": file_sql_id }), 200