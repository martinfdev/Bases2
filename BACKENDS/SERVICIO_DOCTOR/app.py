from flask import Flask
from flask_cors import CORS
import sys
import os

# Agrega la ruta del directorio donde está `config.py`
config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
sys.path.append(config_path)

# Ahora puedes importar `config`
from CONFIG.config import load_config


from app.doctor import doctor_bp
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
load_config(app)
app.register_blueprint(doctor_bp, url_prefix='/doctor')

if __name__ == '__main__':
    #app.run(debug=True)
    app.run(port=os.getenv("BACKEND_DOCTOR"), debug=True)