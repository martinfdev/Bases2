from flask import Flask
from routes.routes_redis import routes
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
app.register_blueprint(routes)

if __name__ == '__main__':
    env = os.getenv("FLASK_ENV", "production")
    debug = os.getenv("FLASK_DEBUG", "False").lower() in ["true", "1"]
    app.run(port=os.getenv("BACKEND_REDIS"),debug=debug)