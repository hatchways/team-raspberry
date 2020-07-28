from marshmallow import Schema, fields

from app import db
from . import utils


class ProspectModel(db.Model):
    __tablename__ = 'prospects'

    # Assign database fields
    # Autoincrement is implicit default with PK set to True
    id = db.Column(db.BigInteger, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    firstName = db.Column(db.String(120), nullable=False)
    lastName = db.Column(db.String(120), nullable=False)

    def __init__(self, email, firstName, lastName):
        self.email = email
        self.firstName = firstName
        self.lastName = lastName

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                'id': x.id,
                'email': x.email,
                'firstName': x.firstName,
                'lastName': x.lastName
            }

        return {'users': list(map(lambda x: to_json(x), ProspectModel.query.all()))}


class ProspectSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Email(required=True, validate=utils.must_not_be_blank)
    firstName = fields.Str(required=True, validate=utils.must_not_be_blank)
    lastName = fields.Str(required=True, validate=utils.must_not_be_blank)


prospect_schema = ProspectSchema()
prospects_schema = ProspectSchema(many=True)
