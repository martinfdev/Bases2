import json
from datetime import datetime
from flask import Blueprint, request, jsonify
from database.dbRedis import RedisClient

routes = Blueprint('routes', __name__)
redis_client = RedisClient()

#GUARDAR UN LOG
@routes.route('/log', methods=['POST']) 
def save_log():
    log_id = datetime.now().strftime('%Y%m%d%H%M%S')
    data = request.get_json()
    log_data = {"log_id": log_id}
    log_data.update(data)  # Agregar los demás campos
    client = redis_client.get_client()
    client.set(log_id, json.dumps(log_data))
    return jsonify({"message": f"Log guardado con log_id '{log_id}'"}), 201

#OBTENER 1 LOG POR ID
@routes.route('/log/<log_id>', methods=['GET'])
def get_log(log_id):
    client = redis_client.get_client()
    log_data = client.get(log_id)
    if log_data is None:
        return jsonify({"error": f"No se encontró un log con log_id '{log_id}'"}), 404

    # Convertir de string JSON a objeto Python antes de responder
    log_object = json.loads(log_data)
    return jsonify(log_object), 200

#OBTENER TODOS LOS LOGS
@routes.route('/log', methods=['GET'])
def get_all_logs():
    try:
        client = redis_client.get_client()
        keys = client.keys('*')
        if not keys:
            return jsonify({"message": "No hay logs almacenados"}), 200
        logs = client.mget(keys)
        decoded_logs = [json.loads(log) for log in logs]
        return jsonify({"logs": decoded_logs}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#ELIMINAR 1 LOG POR ID
@routes.route('/log/<log_id>', methods=['DELETE'])
def delete_log(log_id):
    """
    Endpoint para eliminar un log desde Redis.
    Parámetro de ruta: 'log_id'
    """
    client = redis_client.get_client()
    result = client.delete(log_id)
    if result == 0:
        return jsonify({"error": f"No se encontró un log con log_id '{log_id}' para eliminar"}), 404

    return jsonify({"message": f"Log con log_id '{log_id}' eliminado exitosamente"}), 200

#ELIMINAR TODOS LOS LOGS (PARA PRUEBAS)
@routes.route('/log', methods=['DELETE'])
def delete_all_logs():
    try:
        client = redis_client.get_client()
        client.flushdb()
        return jsonify({"message": "Todos los logs han sido eliminados exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#EDITAR 1 LOG
@routes.route('/log/<log_id>', methods=['PUT'])
def edit_log(log_id):
    try:
        client = redis_client.get_client()
        log_data = client.get(log_id)
        if not log_data:
            return jsonify({"error": f"No se encontró el log con log_id '{log_id}'"}), 404
        
        log_data = json.loads(log_data)
        update_data = request.get_json()
        log_data.update(update_data)
        client.set(log_id, json.dumps(log_data))
        return jsonify({"message": f"Log con log_id '{log_id}' actualizado exitosamente", "log": log_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500