from app import create_app, db, flask_bcrypt
from marshmallow import Schema, fields, ValidationError, pre_load
import jwt
import datetime

class UserModel(db.Model):
    __tablename__ = 'users'

    # Assign database fields
    # Autoincrement is implicit default with PK set to True
    id = db.Column(db.BigInteger, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = flask_bcrypt.generate_password_hash(
            password, create_app().config.get('BCRYPT_LOG_ROUNDS')
        ).decode()


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

    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                'email': x.email,
                'password': x.password
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

# Custom validator
def must_not_be_blank(data):
    if not data:
        raise ValidationError('This field cannot be blank')

# Custom validator to check password length
def pw_length(password):
    if len(password) < 6:
        raise ValidationError('Password must be longer than 6 characters')

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Email(required=True, validate=must_not_be_blank)
    password = fields.Str(required=True, validate=pw_length)

# Initialize schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)
