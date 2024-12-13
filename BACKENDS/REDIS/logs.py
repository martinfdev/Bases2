import json
import sys
import os
config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
sys.path.append(config_path)
from REDIS.dbRedis import RedisClient
from datetime import datetime

redis_client = RedisClient()
def save_log_json(json_data):
    try:
        data = json.loads(json_data)
    except json.JSONDecodeError as e:
        raise ValueError(f"El JSON proporcionado no es válido: {e}")
    
    log_id = datetime.now().strftime('%Y%m%d%H%M%S')
    data = json.loads(json_data)
    log_data = {"log_id": log_id}
    log_data.update(data) 

    client = redis_client.get_client()
    if not client:
        raise ConnectionError("No se pudo Conectar a Redis.")
    client.set(log_id, json.dumps(log_data))



def save_log_param(tipo, status, function, controlador, descripcion):
    log_id = datetime.now().strftime('%Y%m%d%H%M%S')
    log_data = {
            "log_id": log_id,
            "tipo": tipo,
            "status": status,
            "function": function,
            "controlador": controlador,
            "descripcion": descripcion
        }
    client = redis_client.get_client()
    if not client:
        raise ConnectionError("No se pudo Conectar a Redis.")
    client.set(log_id, json.dumps(log_data))


#EJEMPLO DE USO
#log = '{"tipo": "insercion","status": "error","function": "insertarPaciente","controlador": "PacienteController","descripcion": "Error al insertar el paciente: Duplicate key error"}'
#save_log(log)
#save_log_i("insersion", "error", "Login", "PacienteController", "Error al insertar el paciente: Duplicate key error")