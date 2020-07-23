from models.users import UserModel, user_schema, users_schema, BlacklistToken
from server.app import flask_bcrypt
from flask_restful import Resource
from flask import request

class UserRegistration(Resource):
    def post(self):
        data = user_schema.load(request.json)

        # Check if email already exists
        if UserModel.find_by_email(data['email']):
            return {'message': 'User {} already exists'.format(data['email'])}, 409

        new_user = UserModel(
            email = data['email'],
            password = data['password']
        )
        try:
            new_user.save_to_db()
            auth_token = UserModel.encode_auth_token(new_user.id)
            responseObject = {
                'status': 'success',
                'message': 'User {} was created'.format(data['email']),
                'auth_token': auth_token.decode()
            }
            return responseObject, 201
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Something went wrong. Please try again.'
            }
            return responseObject, 500



class UserLogin(Resource):
    def post(self):
        data = user_schema.load(request.json)
        current_user = UserModel.find_by_email(data['email'])
        pw_is_valid = flask_bcrypt.check_password_hash(current_user.password, data.get('password'))

        if current_user and pw_is_valid :
            auth_token = current_user.encode_auth_token(current_user.id)
            responseObject = {
                'status': 'success',
                'message': 'Successfully logged in.',
                'auth_token': auth_token.decode()
            }
            return responseObject, 200
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Wrong credentials.'
            }
            return responseObject, 401

class UserLogout(Resource):
    def post(self):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''
        if auth_token:
            resp = UserModel.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                # mark the token as blacklisted
                blacklist_token = BlacklistToken(token=auth_token)
                try:
                    blacklist_token.save_to_db()
                    responseObject = {
                        'status': 'success',
                        'message': 'Successfully logged out.'
                    }
                    return responseObject, 200
                except Exception as e:
                    responseObject = {
                        'status': 'fail',
                        'message': e
                    }
                return responseObject, 200
            else:
                responseObject = {
                    'status': 'fail',
                    'message': resp
                }
                return responseObject, 401
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return responseObject, 403


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