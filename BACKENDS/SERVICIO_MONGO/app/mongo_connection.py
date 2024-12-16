from pymongo import MongoClient, errors
from dotenv import load_dotenv
import os
load_dotenv()

_clientemongo = None
def get_db_connection_MONGODB():
    global _clientemongo
    if _clientemongo is None: 
        try:
            MONGO_URI = "mongodb://"+os.getenv("MONGO_USER")+":"+os.getenv("MONGO_PASSWORD")+"@localhost:"+os.getenv("MONGO_PORT")+"/"
            MONGO_DB = os.getenv("MONGO_DB")
            _clientemongo = MongoClient(MONGO_URI)        
            return _clientemongo[MONGO_DB]  
        except errors.PyMongoError as e:  
            print(f"Error al conectar a MongoDB: {e}")
            return None
    else:
        MONGO_DB = os.getenv("MONGO_DB")
        return _clientemongo[MONGO_DB]