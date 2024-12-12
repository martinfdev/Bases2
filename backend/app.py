from flask import Flask
from flask_cors import CORS
from config import load_config

from app.auth import auth_bp
from app.admin import admin_bp
from app.doctor import doctor_bp
from app.enfermera import enfermera_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
load_config(app)
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(admin_bp, url_prefix='/admin')
app.register_blueprint(doctor_bp, url_prefix='/doctor')
app.register_blueprint(enfermera_bp, url_prefix='/enfermera')
if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='0.0.0.0', port=5000, debug=True)