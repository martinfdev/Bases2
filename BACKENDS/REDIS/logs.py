import json
import sys
import os
import subprocess
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
    try:
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
    except Exception as e:
        print("Ocurrio un error inseperado: " +str(e))

def get_log():
    try:
        client = redis_client.get_client()
        if not client:
            raise ConnectionError("No se pudo Conectar a Redis.")
        keys = client.keys('*')
        if not keys:
            return json.dumps({"message": "No hay logs almacenados"})
        logs = client.mget(keys)
        decoded_logs = [json.loads(log) for log in logs]
        return json.dumps({"logs": decoded_logs})
    except Exception as e:
        return json.dumps({"error": str(e)})
    
def delete_log():
    try:
        client = redis_client.get_client()
        client.flushdb()
        return json.dumps({"message": "Todos los logs han sido eliminados exitosamente"})
    except Exception as e:
        return json.dumps({"error": str(e)})
    
def crear_backup_r(contenedor, nombre):
    try:
        #client = redis_client.get_client()
        subprocess.run(["docker", "exec", contenedor, "redis-cli", "SAVE"], check=True)
        subprocess.run(["docker", "cp", f"{contenedor}:/data/dump.rdb", nombre], check=True)
        return True
    except Exception as e:
        print(e)
        return False

#save_log_param("CALIFICACION", "OK","CALIFICACION_FUNCION","CALIFICACION_CONTROLLER","TODO BIEN")
'''nombre_backup = "back.rdb" 
ruta_backup = 'C:\\Backups'
print(crear_backup_r("364482f3255d", nombre_backup))'''
