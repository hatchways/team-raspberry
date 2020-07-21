from flask import Flask
from api.ping_handler import ping_handler
from api.home_handler import home_handler
# import views, models, resources

flask_app = Flask(__name__)


flask_app.register_blueprint(home_handler)
flask_app.register_blueprint(ping_handler)

