import json
import os
from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import config

from api.ping_handler import ping_handler
from api.home_handler import home_handler

# Configuration
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)
flask_app = Flask(__name__)
crm_api = Api(flask_app)

# Add to database
flask_app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Flask Sessions key. See https://flask.palletsprojects.com/en/1.1.x/quickstart/#sessions
flask_app.config['SECRET_KEY'] = 'some-secret-string'

# Initializes database connection
db = SQLAlchemy(flask_app)

@flask_app.before_first_request
def create_tables():
    db.create_all()

import views, models, resources

flask_app.register_blueprint(home_handler)
flask_app.register_blueprint(ping_handler)

crm_api.add_resource(resources.UserRegistration, '/registration')
crm_api.add_resource(resources.UserLogin, '/login')
crm_api.add_resource(resources.UserLogoutAccess, '/logout/access')
crm_api.add_resource(resources.UserLogoutRefresh, '/logout/refresh')
crm_api.add_resource(resources.TokenRefresh, '/token/refresh')
crm_api.add_resource(resources.AllUsers, '/users')
crm_api.add_resource(resources.SecretResource, '/secret')

if __name__ == '__main__':
    flask_app.run()
