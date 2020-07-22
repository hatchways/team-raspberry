from flask import Flask
from api.ping_handler import ping_handler
from api.home_handler import home_handler

import json
import os

# Configuration
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)


app = Flask(__name__)


app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

