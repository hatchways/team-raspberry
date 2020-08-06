from typing import List, Any
from functools import wraps
import models.campaigns
import models.campaign_steps
import models.prospect_step_join
from models.prospects import ProspectModel, prospect_schema
from models.users import UserModel, user_schema, users_schema
from flask_restful import Resource
from flask import request, session
import io, csv, redis, json
import logging
# TODO - remove later
from random import randint

logger = logging.Logger(__name__)

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split()[1]
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
            email = data['email'],
            password = data['password'],
            firstName = data['firstName'],
            lastName = data['lastName'],
        )

        try:
            new_user.save_to_db()
            auth_token = UserModel.encode_auth_token(new_user.id)
            responseObject = {
                'status': 'success',
                'message': 'User {} was created'.format(data['email']),
                'auth_token': auth_token.decode(),
                'user': {
                    'userId': new_user.id,
                    'email': new_user.email,
                    'credentials': new_user.credentials,
                    'firstName': new_user.firstName,
                    'lastName': new_user.lastName
                }
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
                'auth_token': auth_token.decode(),
                'user': {
                    'userId': current_user.id,
                    'email': current_user.email,
                    'credentials': current_user.credentials,
                    'firstName': current_user.firstName,
                    'lastName': current_user.lastName
                }   
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

# This class uses 'redis' to temporarily store data while remaining
# stateless. You will have to install redis on ur localmachine to get
# this to work.
class AddProspectCsv(Resource):
    def post(self):
        file = request.files["file"]
        if file.filename.endswith('.csv') != True:
            return {
                "status": "fail",
                "message": "File Upload Failed"
            }, 401
        redisServer = redis.Redis(host='localhost')
    
        stream = io.StringIO(file.stream.read().decode("utf-8-sig"), newline=None)
        csv_input = csv.reader(stream)        
        headers = next(csv_input)
        
        for row in csv_input:
            redisServer.lpush('prospects', json.dumps(row))

        return {
            "status": "success",
            "message": "File Upload Successful",
            "headers": headers 
        }, 200

# This class uses 'redis' to temporarily store data while remaining
# stateless. You will have to install redis on ur localmachine to get
# this to work.
class ImportProspects(Resource):
    def post(self):
        data = request.json
        if data['email'] == data['none']: 
            responseObject = {
                "status": "fail",
                "message": "Email field cannot be None"
            }
            return responseObject, 401

        redisServer = redis.Redis(host='localhost')
            
        # Currently just associating the prospect with user number 1
        current_user = UserModel.find_by_id(1)

        if redisServer.llen('prospects') == 0:
            return {
                "status": "fail",
                "message": "No prospects to add. Please check .csv file"
            }, 400

        while (redisServer.llen('prospects') > 0):
            print('in')
            redisProspect = json.loads(redisServer.rpop('prospects'))
            new_prospect = ProspectModel(
                email = redisProspect[data['email']],
                firstName = redisProspect[data['firstName']],
                lastName = redisProspect[data['lastName']],
                userId = current_user.id,
            )
            new_prospect.save_to_db()

        ### Guessing since we allow duplicate emails here it's fine not to check this?
        ### I'll remove these comments if I get the go 
        #for row in prospectsHolder:
        #    current_prospect = ProspectModel.return_email_prospects(row[data['email']])
        #    if current_prospect:
        #        return {
        #            "status": "fail",
        #            "message": "Prospect with email {} already exists".format(row[data['email']])
        #        }, 409

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
                "firstName": x.firstName,
                "lastName": x.lastName,
            }

        prospects = ProspectModel.return_user_prospects(user_id)
        return {"prospects": list(map(lambda x: to_json(x), prospects))}

class GetUser(Resource):
    @login_required
    def post(self, user_id):

        if (user_id == -1):
            return {
                'status': 'fail',
                'user': None,
            }, 400

        user = None
        if (user_id > -1):
            user = UserModel.find_by_id(user_id)

        
        return {
            'status': 'success',
            'user': {
                'userId': user.id,
                'email': user.email,
                'credentials': user.credentials,
                'firstName': user.firstName,
                'lastName': user.lastName
            },
            'message': "Here's your user"
            }, 200

class Campaigns(Resource):
    @login_required
    def post(self, user_id):
        # TODO
        # data = campaign_schema.load(request.json)
        #
        # new_campaign = CampaignModel(
        #     title=data.get('title'),
        #     userId=user_id
        # )
        # try:
        #     new_campaign.save_to_db()
            response_object = {
                'status': 'success',
                #'message': 'Campaign {} was created'.format(data['title']) TODO: Use this one once DB is ready.
                'message': 'Campaign {} was created'.format(request.json.get('title'))
            }
            logger.error(response_object)
            return response_object, 201
        # except Exception as e:
        #     response_object = {
        #         'status': 'fail',
        #         'message': 'Something went wrong. Please try again.'
        #     }
        #     return response_object, 500


    @login_required
    def get(self, user_id):
        def to_json(x):
            campaign_id = randint(1, 100000)
            return {
                # 'title': campaign.title,
                # 'user_id': campaign.user_id,
                # 'steps': campaign.steps,
                # # TODO: Kevin needs to add these fields
                # # 'replies': ,
                # # 'prospects':
                'id': campaign_id,
                'title': f'Campaign {campaign_id}',
                'user_id': randint(1, 100000),
                'steps': randint(1, 10),
                'replies': randint(1, 10),
                'prospects': randint(1, 10),
                'created': 'August 5, 2020'
            }

        #campaigns = CampaignModel.find_by_user(user_id) # TODO: is this the correct class method to use?
        campaigns = ['something'] * 10
        return {"campaigns": list(map(lambda x: to_json(x), campaigns))}

