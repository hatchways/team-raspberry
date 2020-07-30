from typing import List, Any
from functools import wraps
from models.users import UserModel, user_schema, users_schema
from models.prospects import ProspectModel, prospect_schema, prospects_schema
from flask_restful import Resource
from flask import request, session
import io, csv


def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
            if auth_token:
                resp = UserModel.decode_auth_token(auth_token)
                # Strings are error messages, if it's an int, then it's the user_id.
                if not isinstance(resp, str):
                    user_id = resp
                    args = args + (user_id,)
                    return f(*args, **kwargs)
                else:
                    responseObject = {
                        'status': 'fail',
                        'message': resp
                    }
                    return responseObject, 401

        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return responseObject, 403

    return wrap


class UserRegistration(Resource):
    def post(self):
        data = user_schema.load(request.json)
        
        # Check if email already exists
        if UserModel.find_by_email(data['email']):
            return {'message': 'User {} already exists'.format(data['email'])}, 409

        new_user = UserModel(
            email = data.get('email'),
            credentials = data.get('credentials'),
            password = data.get('password'),
            firstName = data.get('firstName'),
            lastName = data.get('lastName')
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
        data = request.json
        current_user = UserModel.find_by_email(data['email'])

        if current_user is None:
            responseObject = {
                'status': 'fail',
                'message': 'Wrong credentials.'
            }
            return responseObject, 401

        pw_is_valid = current_user.verify_password(data['password'])

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

    @login_required
    def post(self, user_id):
        user = UserModel.find_by_id(user_id)
        if user:
            responseObject = {
                'status': 'success',
                'message': f'Logged out user {user_id}'
            }
            return responseObject, 200


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

prospectsHolder = []
class AddProspectCsv(Resource):

    def post(self):
        file = request.files["file"]
        if file.filename.endswith('.csv') != True:
            return {
                "status": "fail",
                "message": "File Upload Failed"
            }, 401

        stream = io.StringIO(file.stream.read().decode("utf-8-sig"), newline=None)
        csv_input = csv.reader(stream)        
        headers = next(csv_input)
        
        for row in csv_input:
            prospectsHolder.append(row)

        return {
            "status": "success",
            "message": "File Upload Successful",
            "headers": headers 
        }, 200


class ImportProspects(Resource):
    def post(self):
        data = request.json
        
        if data['email'] == data['none']: 
            responseObject = {
                "status": "fail",
                "message": "Email field cannot be None"
            }
            return responseObject, 401
            
        # Currently just associating the prospect with user number 1
        current_user = UserModel.find_by_id(1)

        if len(prospectsHolder) == 0:
            return {
                "status": "fail",
                "message": "No prospects to add. Please check .csv file"
            }, 400

        for row in prospectsHolder:
            current_prospect = ProspectModel.return_email_prospects(row[data['email']])
            if current_prospect:
                return {
                    "status": "fail",
                    "message": "Prospect with email {} already exists".format(row[data['email']])
                }, 409
    
            new_prospect = ProspectModel(
                email = row[data['email']],
                status = row[data['status']],
                firstName = row[data['firstName']],
                lastName = row[data['lastName']],
                userId = current_user.id,
            )
            new_prospect.save_to_db()

        return { 
            "status": "success",
            "message": "Prospects have been added to the database"
        }, 200
class Prospects(Resource):
    # TODO: Creating users is not in the spec, so just using this for testing purposes.
    @login_required
    def post(self, user_id):
        data = prospect_schema.load(request.json)

        new_prospect = ProspectModel(
            email=data.get('email'),
            firstName=data.get('firstName'),
            lastName=data.get('lastName'),
            status=data.get('status'),
            userId=user_id
        )
        try:
            new_prospect.save_to_db()
            response_object = {
                'status': 'success',
                'message': 'Prospect {} was created'.format(data['email'])
            }
            return response_object, 201
        except Exception as e:
            response_object = {
                'status': 'fail',
                'message': 'Something went wrong. Please try again.'
            }
            return response_object, 500

    @login_required
    def get(self, user_id):
        def to_json(x):
            return {
                "id": x.id,
                "email": x.email,
                "status": x.status,
                "firstName": x.firstName,
                "lastName": x.lastName,
            }

        prospects = ProspectModel.return_user_prospects(user_id)
        return {"prospects": list(map(lambda x: to_json(x), prospects))}
