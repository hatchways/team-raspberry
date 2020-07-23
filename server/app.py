from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import requests
import flask
import os


from api.ping_handler import ping_handler
from api.home_handler import home_handler
from user import user
# from google import google



# Initialize App
app = Flask(__name__)
app.secret_key = 'REPLACE ME - this value is here as a placeholder.'
rootdir = os.path.abspath(os.path.dirname(__file__))

# Database Setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(rootdir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize DB
db = SQLAlchemy(app)

# Initialize Marshmallow
ma = Marshmallow(app)

# GoogleAuth Model
class GoogleAuth(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  email = db.Column(db.String(100))
  credentials = db.Column(db.String(500))

  def __init__(self, name, email, credentials):
    self.name = name
    self.email = email
    self.credentials = credentials

# User Schema
class GoogleAuthSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'email', 'credentials')

# Initialize Schema
google_auth_schema = GoogleAuthSchema()
google_auths_schema = GoogleAuthSchema(many=True)

# User Model
class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), unique=True)
  email = db.Column(db.String(100), unique=True)
  credentials = db.Column(db.String(500))

  def __init__(self, name, email, credentials):
    self.name = name
    self.email = email
    self.credentials = credentials

# User Schema
class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'email', 'credentials')

user_schema = UserSchema()
users_schema = UserSchema(many=True)



@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/', methods=['GET'])
def home():
  return (
    "<p>Welcome to the home page!</p>"
  )




app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
app.register_blueprint(user, url_prefix='/user')
# app.register_blueprint(google, url_prefix='/google')

if __name__ == '__main__':
  # When running locally, disable OAuthlib's HTTPs verification.
  # ACTION ITEM for developers:
  #     When running in production *do not* leave this option enabled.
  os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

  # Specify a hostname and port that are set as a valid redirect URI
  # for your API project in the Google API Console.
  app.run('localhost', 5000, debug=True)