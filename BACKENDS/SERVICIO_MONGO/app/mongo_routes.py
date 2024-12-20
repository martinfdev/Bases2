from flask import Blueprint, jsonify, request
from pymongo import MongoClient, errors
from pymongo.errors import PyMongoError, OperationFailure, DuplicateKeyError
import bcrypt
import pyodbc
import re
from dotenv import load_dotenv
import os
from .mongo_connection import get_db_connection_MONGODB
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
        #save_log_param("insercion", "ERROR", "crear_expediente", "Mongo_Controller", f"Documento insertado con ID: {result.inserted_id}")
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
        #save_log_param("insercion", "ERROR", "nuevo_ingreso", "Mongo_Controller", "Ingreso insertado con exito") 
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
        #save_log_param("consulta", "ERROR", "obtener_expediente", "Mongo_Controller", "Expediente Obtenido") 
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
        exped = expedientes.find_one({"_id": dpi})
        if not exped:
            #save_log_param("consulta", "ERROR", "obtener_expediente", "Mongo_Controller", "No existe un expediente del paciente con DPI: {dpi}.")
            return jsonify({"error": f"No existe un expediente del paciente con DPI: {dpi}."}), 400 
        historial = exped.get("historialIngresos", [])
        data["historialIngresos"] = historial
        expedientes.update_one(
            {"_id": dpi},
            {"$set": data}
        )
        #save_log_param("insercion", "ERROR", "modificar_expediente", "Mongo_Controller", f"Expediente del paciente con DPI {dpi} actualizado correctamente.")
        return jsonify({"message": f"Expediente del paciente con DPI {dpi} actualizado correctamente."}), 200
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

@base_mongo.route('/agregar_notasCuidado', methods=['POST']) 
def agregar_notasCuidado_expediente():
    data = request.get_json()
    if not data:
        #save_log_param("insercion", "ERROR", "crear_expediente", "Mongo_Controller", "No se recibieron datos sobre el expediente.")
        return jsonify({"error": "No se recibieron datos sobre el expediente."}), 400
    dpi = data.get("_id")
    if not dpi:
        #save_log_param("insercion", "ERROR", "crear_expediente", "Mongo_Controller", "El DPI del paciente es requerido.")
        return jsonify({"error": "El DPI del paciente es requerido."}), 400
    data_ingreso = data.get("contenido")
    if not data_ingreso:
        #save_log_param("insercion", "ERROR", "nuevo_ingreso", "Mongo_Controller", "El Contenido de la nota de cuidado de paciente es requerido.") 
        return jsonify({"error": "El Contenido de la nota de cuidado de paciente es requerido."}), 400
    
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
        exped = expedientes.find_one({"_id": dpi})
        if not exped:
            #save_log_param("consulta", "ERROR", "obtener_expediente", "Mongo_Controller", "No existe un expediente del paciente con DPI: {dpi}.")
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
        #save_log_param("insercion", "ERROR", "modificar_expediente", "Mongo_Controller", f"Expediente del paciente con DPI {dpi} actualizado correctamente.")
        return jsonify({"message": f"Expediente del paciente con DPI {dpi} actualizado correctamente."}), 200
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
