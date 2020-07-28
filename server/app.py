import json
import os
from flask import Flask, request, abort
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
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

# Initializes database connection
db = SQLAlchemy()

# Initialize a migrate instance
migrate = Migrate()

# Initialize bcrypt
flask_bcrypt = Bcrypt()

def create_app():
    flask_app = Flask(__name__)
    # Add to database
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    flask_app.register_blueprint(home_handler)
    flask_app.register_blueprint(ping_handler)

    crm_api = Api(flask_app)

    import resources

    crm_api.add_resource(resources.UserRegistration, '/registration')
    crm_api.add_resource(resources.UserLogin, '/login')
    crm_api.add_resource(resources.UserLogout, '/logout')
    crm_api.add_resource(resources.AllUsers, '/users')
    crm_api.add_resource(resources.SecretResource, '/secret')

    crm_api.add_resource(resources.Prospects, '/prospects')



    db.init_app(flask_app)
    migrate.init_app(flask_app, db)

    return flask_app


if __name__ == '__main__':
    flask_app = create_app()
    with flask_app.app_context():
        flask_app.run('0.0.0.0', port=5000)
