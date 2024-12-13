import redis
import os
from dotenv import load_dotenv

load_dotenv()

class RedisClient:
    def __init__(self):
        self.host = os.getenv("REDIS_HOST", "localhost")
        self.port = int(os.getenv("REDIS_PORT", 6379))
        self.password = os.getenv("REDIS_PASSWORD", None)
        self.client = None

    def connect(self):
        try:
            self.client = redis.StrictRedis(
                host=self.host, 
                port=self.port, 
                password=self.password, 
                decode_responses=True
            )
            self.client.ping()
            print("Conexión a Redis exitosa!")
        except redis.ConnectionError as e:
            print(f"Error al conectar con Redis: {e}")
            raise e

    def get_client(self):
        if not self.client:
            self.connect()
        return self.client