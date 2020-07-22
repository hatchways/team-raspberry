from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
# from api.ping_handler import ping_handler
# from api.home_handler import home_handler


# Initialize App
app = Flask(__name__)
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

# app.register_blueprint(home_handler)
# app.register_blueprint(ping_handler)