import json
from flask import Flask, request, abort
from flask_cors import CORS
import os
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import config
from api.ping_handler import ping_handler
from api.home_handler import home_handler

# For testing
# TODO: REMOVE BEFORE DEPLOYMENT
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

# Initializes database connection
db = SQLAlchemy()

# Initialize a migrate instance
migrate = Migrate()

# Initialize bcrypt
flask_bcrypt = Bcrypt()

def create_app():
    flask_app = Flask(__name__)
   
    CORS(flask_app)
    # Add to database
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    flask_app.register_blueprint(home_handler)
    flask_app.register_blueprint(ping_handler)

    crm_api = Api(flask_app, prefix='/api')

    import resources
    import google_resources

    crm_api.add_resource(resources.UserRegistration, '/registration')
    crm_api.add_resource(resources.UserLogin, '/login')
    crm_api.add_resource(resources.UserLogout, '/logout')
    crm_api.add_resource(resources.AllUsers, '/users')
    crm_api.add_resource(resources.GetUser, '/user')
    crm_api.add_resource(resources.AddProspectCsv, '/add/prospectsCsv')
    crm_api.add_resource(resources.ImportProspects, '/import/prospects')
    crm_api.add_resource(google_resources.Authorize, '/authorize')
    crm_api.add_resource(google_resources.OAuth2Callback, '/oauth2callback')
    crm_api.add_resource(resources.Prospects, '/prospects')

    db.init_app(flask_app)
    migrate.init_app(flask_app, db)

    return flask_app


if __name__ == '__main__':
    flask_app = create_app()
    with flask_app.app_context():
        flask_app.run('0.0.0.0', port=5000)
