import json
from flask import jsonify, request, Blueprint
from config import TEAM_NAME
user_handler = Blueprint('user_handler', __name__)

# Create a User
@user_handler.route('/user', methods=['POST'], endpoint='add_user')
def add_user():
  name = request.json['name']
  email = request.json['email']
  credentials = request.json['credentials']

  new_user = User(name, email, credentials)

  db.session.add(new_user)
  db.session.commit()

  return user_schema.jsonify(new_user)


# Get All Users
@user_handler.route('/user', methods=['GET'], endpoint='get_users')
def get_users():
  all_users = User.query.all()
  result = users_schema.dump(all_users)
  return jsonify(result)

# Get Single User
@user_handler.route('/user/<id>', methods=['GET'], endpoint='get_user')
def get_user(id):
  user = User.query.get(id)
  return user_schema.jsonify(user)

# Update a User
@user_handler.route('/user/<id>', methods=['PUT'], endpoint='update_user')
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
@user_handler.route('/user/<id>', methods=['DELETE'], endpoint='delete_user')
def delete_user(id):
  user = User.query.get(id)
  db.session.delete(user)
  db.session.commit()
  return user_schema.jsonify(user)