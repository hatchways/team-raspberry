import json
import os
from flask import Flask
from api.ping_handler import ping_handler
from api.home_handler import home_handler
# import views, models, resources

# Configuration
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)

flask_app = Flask(__name__)

flask_app.register_blueprint(home_handler)
flask_app.register_blueprint(ping_handler)

