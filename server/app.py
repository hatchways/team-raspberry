import json
from flask import Flask, request, abort
from flask_restful import Api #TODO Get rid of this and just use blueprints
from flask_sqlalchemy import SQLAlchemy
import config
from api.ping_handler import ping_handler
from api.home_handler import home_handler

# Initializes database connection
db = SQLAlchemy()

def create_app():
    flask_app = Flask(__name__)
    flask_app.secret_key = "This is a key for testing"
    # Add to database
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    flask_app.register_blueprint(home_handler)
    flask_app.register_blueprint(ping_handler)

    crm_api = Api(flask_app)

    import resources
    import google_resources

    crm_api.add_resource(resources.UserRegistration, '/registration')
    crm_api.add_resource(resources.UserLogin, '/login')
    crm_api.add_resource(resources.UserLogoutAccess, '/logout/access')
    crm_api.add_resource(resources.UserLogoutRefresh, '/logout/refresh')
    crm_api.add_resource(resources.TokenRefresh, '/token/refresh')
    crm_api.add_resource(resources.AllUsers, '/users')
    crm_api.add_resource(resources.SecretResource, '/secret')
    crm_api.add_resource(google_resources.Authorize, '/authorize')
    crm_api.add_resource(google_resources.Revoke, '/revoke')
    crm_api.add_resource(google_resources.TestAPIRequest, '/testapirequest')
    crm_api.add_resource(google_resources.OAuth2Callback, '/oauth2callback')

    db.init_app(flask_app)

    return flask_app

def create_tables():
    db.create_all()
    db.session.commit()


if __name__ == '__main__':
    flask_app = create_app()
    with flask_app.app_context():
        create_tables()
        flask_app.run('0.0.0.0', port=5000)
