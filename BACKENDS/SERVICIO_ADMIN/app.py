from flask import Flask
from flask_cors import CORS
import os
import sys

# Agrega la ruta del directorio donde está `config.py`
config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
sys.path.append(config_path)

# Ahora puedes importar `config`
from CONFIG.config import load_config
from SERVICIO_MONGO.app.mongo_routes import obtener_diagnosticos_comunes



from app.admin import admin_bp
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
load_config(app)
app.register_blueprint(admin_bp, url_prefix='/admin')
if __name__ == '__main__':
    #app.run(debug=True)
    app.run(port=os.getenv("BACKEND_ADMIN"), debug=True)