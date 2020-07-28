from app import create_app, db, flask_bcrypt
from marshmallow import Schema, fields, ValidationError, pre_load
import jwt
import datetime
from . import utils

class UserModel(db.Model):
    __tablename__ = 'users'

    # Assign database fields
    # Autoincrement is implicit default with PK set to True
    id = db.Column(db.BigInteger, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    firstName = db.Column(db.String(120), nullable=False)
    lastName = db.Column(db.String(120), nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    def __init__(self, email, password, firstName, lastName):
        self.email = email
        self.password = flask_bcrypt.generate_password_hash(
            password, create_app().config.get('BCRYPT_LOG_ROUNDS')
        ).decode()
        self.firstName = firstName
        self.lastName = lastName


    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    # return a user’s data if there is match by email
    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    # return a user’s data if there is match by email
    @classmethod
    def find_by_id(cls, user_id):
        return cls.query.filter_by(id=user_id).first()

    def verify_password(self, password):
        return flask_bcrypt.check_password_hash(self.password, password)

    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                'email': x.email,
                'password': x.password,
                'firstName': x.firstName,
                'lastName': x.lastName
            }
        return {'users': list(map(lambda x: to_json(x), UserModel.query.all()))}

    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {'message': '{} rows deleted'.format(num_rows_deleted)}
        except:
            return {'message': 'Something went wrong'}


    @staticmethod
    def encode_auth_token(user_id: int):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=60, seconds=0),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                # TODO
                'SECRET_KEY',
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Validates the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, 'SECRET_KEY')
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Email(required=True, validate=utils.must_not_be_blank)
    password = fields.Str(required=True, validate=utils.pw_length)
    firstName = fields.Str(required=True)
    lastName = fields.Str(required=True)
    created = fields.DateTime(required=True, dump_only=True)

# Initialize schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)
