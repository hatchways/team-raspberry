from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery
import requests
import flask
import os


# from api.ping_handler import ping_handler
# from api.home_handler import home_handler

# Configuration
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)
SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  # 'https://www.googleapis.com/auth/userinfo.email',
  # 'https://www.googleapis.com/auth/userinfo.profile',
]
API_SERVICE_NAME = 'gmail'
API_VERSION = 'v1'


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

# Initialize Schema
# user_schema = UserSchema(strict=True)
user_schema = UserSchema()
# users_schema = UserSchema(many=True, strict=True)
users_schema = UserSchema(many=True)

@app.before_first_request
def create_tables():
    db.create_all()

# Create a User
@app.route('/user', methods=['POST'], endpoint='add_user')
def add_user():
  name = request.json['name']
  email = request.json['email']
  credentials = request.json['credentials']

  new_user = User(name, email, credentials)

  db.session.add(new_user)
  db.session.commit()

  return user_schema.jsonify(new_user)


# Get All Users
@app.route('/user', methods=['GET'], endpoint='get_users')
def get_users():
  all_users = User.query.all()
  result = users_schema.dump(all_users)
  return jsonify(result)

# Get Single User
@app.route('/user/<id>', methods=['GET'], endpoint='get_user')
def get_user(id):
  user = User.query.get(id)
  return user_schema.jsonify(user)

# Update a User
@app.route('/user/<id>', methods=['PUT'], endpoint='update_user')
def update_user(id):
  user = User.query.get(id)

  name = request.json['name']
  email = request.json['email']
  credentials = request.json['credentials']

  user.name = name
  user.email = email
  user.credentials = credentials

  db.session.commit()

  return user_schema.jsonify(user)

# Delete User
@app.route('/user/<id>', methods=['DELETE'], endpoint='delete_user')
def delete_user(id):
  user = User.query.get(id)
  db.session.delete(user)
  db.session.commit()
  return user_schema.jsonify(user)

# @app.route('/user/<id>/oauth', methods=['PUT'], endpoint='google_auth')
# def google_auth(id):
#   user = User.query.get(id)

#   user.credentials = request.json['credentials']

# Authorize Google Oauth
@app.route('/authorize')
def authorize():
  # Create flow instance to manage the OAuth 2.0 Authorization Grant Flow steps.
  flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      CLIENT_SECRETS_FILE, scopes=SCOPES)

  # The URI created here must exactly match one of the authorized redirect URIs
  # for the OAuth 2.0 client, which you configured in the API Console. If this
  # value doesn't match an authorized URI, you will get a 'redirect_uri_mismatch'
  # error.
  flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

  authorization_url, state = flow.authorization_url(
      # Enable offline access so that you can refresh an access token without
      # re-prompting the user for permission. Recommended for web server apps.
      access_type='offline',
      # Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes='true')

  # Store the state so the callback can verify the auth server response.
  flask.session['state'] = state

  return flask.redirect(authorization_url)

# app.register_blueprint(home_handler)
# app.register_blueprint(ping_handler)

if __name__ == '__main__':
  # When running locally, disable OAuthlib's HTTPs verification.
  # ACTION ITEM for developers:
  #     When running in production *do not* leave this option enabled.
  os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

  # Specify a hostname and port that are set as a valid redirect URI
  # for your API project in the Google API Console.
  app.run('localhost', 5000, debug=True)