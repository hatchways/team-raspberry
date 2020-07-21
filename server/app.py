from flask import Flask
from flask_restful import Api

from api.ping_handler import ping_handler
from api.home_handler import home_handler

flask_app = Flask(__name__)
api = Api(flask_app)

import views, models, resources


flask_app.register_blueprint(home_handler)
flask_app.register_blueprint(ping_handler)

api.add_resource(resources.UserRegistration, '/registration')
api.add_resource(resources.UserLogin, '/login')
api.add_resource(resources.UserLogoutAccess, '/logout/access')
api.add_resource(resources.UserLogoutRefresh, '/logout/refresh')
api.add_resource(resources.TokenRefresh, '/token/refresh')
api.add_resource(resources.AllUsers, '/users')
api.add_resource(resources.SecretResource, '/secret')
