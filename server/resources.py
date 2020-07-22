from flask_restful import Resource, reqparse
from models.users import UserModel

# TODO: Replace with Marshmallow
parser = reqparse.RequestParser()
parser.add_argument('username', help = 'This field cannot be blank', required=True)
parser.add_argument('password', help = 'This field cannot be blank', required=True)

class UserRegistration(Resource):
    def post(self):
        data = parser.parse_args()

        # Check if username already exists
        if UserModel.find_by_username(data['username']):
            return {'message': 'User {} already exists'.format(data['username'])}, 409

        new_user = UserModel(
            username=data['username'],
            password=data['password']
        )
        try:
            new_user.save_to_db()
            return {'message': 'User {} was created'.format(data['username'])}, 201
        except Exception as e:
            return {'message': 'Something went wrong'}, 500



class UserLogin(Resource):
    def post(self):
        data = parser.parse_args()
        current_user = UserModel.find_by_username(data['username'])
        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['username'])}

        if data['password'] == current_user.password:
            return {'message': 'Logged in as {}'.format(current_user.username)}
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