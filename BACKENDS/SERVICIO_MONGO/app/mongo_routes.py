from flask import Blueprint, jsonify, request
from pymongo import MongoClient, errors
from pymongo.errors import PyMongoError, OperationFailure, DuplicateKeyError
import bcrypt
import pyodbc
import re
from dotenv import load_dotenv
import os
from app.mongo_connection import get_db_connection_MONGODB
base_mongo = Blueprint('mongo', __name__)
load_dotenv()



@base_mongo.route('/crear_expediente', methods=['POST']) #dashbord para el administrador
def crear_expediente():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se recibieron datos sobre el expediente."}), 400
    dpi = data.get("_id")
    if not dpi:
        return jsonify({"error": "El DPI del paciente es requerido."}), 400
    
    cliente = get_db_connection_MONGODB()
    if cliente is None:
        return jsonify({"message": f"Error.No se pudo conectar a la base de datos Mongo!"}), 409
    try:
        MONGO_DB = os.getenv("MONGO_DB")
        MONGO_COLLECTION =  os.getenv("MONGO_COLLECTION") 
        db = cliente[MONGO_DB]
        expedientes = db[MONGO_COLLECTION]

        #BUSCAR EXPEDIENTE EXISTENTE
        if expedientes.find_one({"_id": dpi}):
            return jsonify({"error": f"Ya existe un expediente del paciente con DPI: {dpi}."}), 400
        
        result = expedientes.insert_one(data)
        print(f"Documento insertado con ID: {result.inserted_id}")
        
        return jsonify({"message": f"Documento insertado con ID: {result.inserted_id}"}), 201
    except DuplicateKeyError as e:
        return jsonify({"Error": "Ya existe un expediente para este paciente!"}), 400
    except OperationFailure as e:
        return jsonify({"Error": "Error de operación en MongoDB: " + str(e)}), 400
    except PyMongoError as e:
        return jsonify({"Error": "Error en la base de datos MongoDB: " + str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cliente.close()


@base_mongo.route('/nuevo_ingreso', methods=['POST']) #dashbord para el administrador
def nuevo_ingreso():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se recibieron datos sobre el expediente."}), 400
    dpi = data.get("_id")
    data_ingreso = data.get("contenido")
    if not dpi:
        return jsonify({"error": "El DPI del paciente es requerido."}), 400
    if not data_ingreso:
        return jsonify({"error": "El Contenido del ingreso de paciente es requerido."}), 400
    cliente = get_db_connection_MONGODB()
    if cliente is None:
        return jsonify({"message": f"Error.No se pudo conectar a la base de datos Mongo!"}), 409
    try:
        MONGO_DB = os.getenv("MONGO_DB")
        MONGO_COLLECTION =  os.getenv("MONGO_COLLECTION") 
        db = cliente[MONGO_DB]
        expedientes = db[MONGO_COLLECTION]

        #BUSCAR EXPEDIENTE EXISTENTE
        exped = expedientes.find_one({"_id": dpi})
        if not exped:
            return jsonify({"error": f"No existe un expediente del paciente con DPI: {dpi}."}), 400
        
        result = expedientes.update_one(
            {"_id": dpi},
            {"$push": {"Historial de ingresos": data_ingreso}}
        )
        print(f"Ingreso Registrado con Exito")
        
        return jsonify({"message": f"Ingreso insertado con exito"}), 201
    except OperationFailure as e:
        return jsonify({"Error": "Error de operación en MongoDB: " + str(e)}), 400
    except PyMongoError as e:
        return jsonify({"Error": "Error en la base de datos MongoDB: " + str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500
    finally:
        cliente.close()

