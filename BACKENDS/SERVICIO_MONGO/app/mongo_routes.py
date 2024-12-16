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
    #data = request.get_json()
    db = get_db_connection_MONGODB()
    if db is None:
        return jsonify({"message": f"Error.No se pudo conectar a la base de datos Mongo!"}), 409
    try:
        MONGO_COLLECTION =  os.getenv("MONGO_COLLECTION") 
        expedientes = db[MONGO_COLLECTION]
        #EXPEDIENTE DE PRUEBA DE INSERCION DE DATOS EN LA BASE
        json_documento = {
            "nombre": "Juan",
            "edad": 30,
            "direccion": "Calle 123",
            "telefono": "123-456-789"
        }
        result = expedientes.insert_one(json_documento)
        print(f"Documento insertado con ID: {result.inserted_id}")
        return jsonify({"message": f"Documento insertado con ID: {result.inserted_id}"}), 201
    except DuplicateKeyError as e:
        return jsonify({"Error": "Error de clave duplicada en la base de datos MongoDB: " + str(e)}), 400
    except OperationFailure as e:
        return jsonify({"Error": "Error de operación en MongoDB: " + str(e)}), 400
    except PyMongoError as e:
        return jsonify({"Error": "Error en la base de datos MongoDB: " + str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500