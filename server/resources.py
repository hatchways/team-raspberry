from models.users import UserModel, user_schema, users_schema
from flask_restful import Resource
from flask import request, make_response, jsonify

class UserRegistration(Resource):
    def post(self):
        data = user_schema.load(request.json)

        # Check if email already exists
        if UserModel.find_by_email(data['email']):
            return {'message': 'User {} already exists'.format(data['email'])}, 409

        new_user = UserModel(
            email = data['email'],
            password = UserModel.generate_hash(data['password'])
        )
        try:
            new_user.save_to_db()
            auth_token = UserModel.encode_auth_token(new_user.id)
            responseObject = {
                'status': 'success',
                'message': 'User {} was created'.format(data['email']),
                'auth_token': auth_token.decode()
            }
            return make_response(jsonify(responseObject)), 201
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Something went wrong. Please try again.'
            }
            return make_response(jsonify(responseObject)), 500



class UserLogin(Resource):
    def post(self):
        data = user_schema.load(request.json)
        current_user = UserModel.find_by_email(data['email'])
        if not current_user:
            return {'message': 'Wrong credentials'}

        if UserModel.verify_hash(data['password'], current_user.password):
            return {'message': 'Logged in as {}'.format(current_user.email)}
        else:
            return {'message': 'Wrong credentials'}, 401

class UserLogoutAccess(Resource):
    def post(self):
        return {'message': 'User logout'}

class UserLogoutRefresh(Resource):
    def post(self):
        return {'message': 'User logout'}

class TokenRefresh(Resource):
    def post(self):
        return {'message': 'Token refresh'}

class AllUsers(Resource):
    def get(self):
        return UserModel.return_all()

    def delete(self):
        return UserModel.delete_all()

class SecretResource(Resource):
    def get(self):
        return {
            'answer': 42
        }