from app import db
from marshmallow import Schema, fields, ValidationError, pre_load


class ProspectModel(db.Model):
    __tablename__ = "prospects"

    # Assign database fields
    # Autoincrement is implicit default with PK set to True
    id = db.Column(db.BigInteger, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    status = db.Column(db.String(120), nullable=True)
    firstName = db.Column(db.String(120), nullable=True)
    lastName = db.Column(db.String(120), nullable=True)
    userId = db.Column(db.BigInteger, db.ForeignKey("users.id"), nullable=False)

    def __init__(self, email, status, firstName, lastName, userId):
        self.email = email
        self.status = status
        self.firstName = firstName
        self.lastName = lastName
        self.userId = userId

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                "email": x.email,
                "status": x.status,
                "firstName": x.firstName,
                "lastName": x.lastName,
                "userId": x.userId,
            }

        return {"prospects": list(map(lambda x: to_json(x), ProspectModel.query.all()))}

    @classmethod
    def return_user_prospects(cls, user):
        return cls.query.filter_by(userId=user).first()
    
    @classmethod
    def return_email_prospects(cls, email):
        return cls.query.filter_by(email=email).first()


# Custom validator
def must_not_be_blank(data):
    if not data:
        raise ValidationError("This field cannot be blank")


class ProspectSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Email(required=True, validate=must_not_be_blank)
    status = fields.Str(required=False)
    firstName = fields.Str(required=False)
    lastName = fields.Str(required=False)
    userId = fields.Int(required=False)


# Initialize schema
prospect_schema = ProspectSchema()
prospects_schema = ProspectSchema(many=True)
