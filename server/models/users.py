from app import create_app, db
from passlib.hash import pbkdf2_sha256 as sha256
from marshmallow import Schema, fields, ValidationError, pre_load

class UserModel(db.Model):
    __tablename__ = 'users'

    # Assign database fields
    # Autoincrement is implicit default with PK set to True
    id = db.Column(db.BigInteger, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    credentials = db.Column(db.String(500), nullable=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    # Update Google OAuth credentials
    def updateCredentials(self, credentials):
        # Credentials may need to be parsed from json.
        self.credentials = credentials
        self.save_to_db()

    # return a user’s data if there is match by email
    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

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
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)


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
