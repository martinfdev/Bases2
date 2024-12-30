from flask import Flask
from flask_cors import CORS
import sys
import os

# Agrega la ruta del directorio donde está `config.py`
config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
sys.path.append(config_path)

# Ahora puedes importar `config`
from CONFIG.config import load_config
from dotenv import load_dotenv
from SERVICIO_NEO4J.app.extraer_datos import base_neo4j
from SERVICIO_NEO4J.app.load_data_neo import cargar_datos

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
load_config(app)
app.register_blueprint(base_neo4j, url_prefix='/neo')
app.register_blueprint(cargar_datos, url_prefix='/cargar_datos_neo')

if __name__ == '__main__':
    #app.run(debug=True)
    app.run(port=os.getenv("BACKEND_NEO"), debug=True)