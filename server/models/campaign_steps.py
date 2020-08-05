import datetime
from app import db
from marshmallow import Schema, fields, ValidationError, pre_load

class StepModel(db.Model):
    __tablename__ = 'campaign_steps'

    # Assign database fields
    # Autoincrement is implicit default with PK set to True
    id = db.Column(db.BigInteger, primary_key=True)
    step_name = db.Column(db.String(200), nullable=False)
    email_subject = db.Column(db.String(200), nullable=False)
    email_body = db.Column(db.String(10000), nullable=False)
    campaign_id = db.Column(db.BigInteger, db.ForeignKey("campaigns.id"), nullable=False)
    step_prospect_join = db.relationship('ProspectStepModel', backref='step_prospect', lazy=True)
    created = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    def __init__(self, step_name, email_subject, email_body):
        self.step_name = step_name
        self.email_subject = email_subject
        self.email_body = email_body

    def save_to_db(self):
        # Session can get into a weird state where nothing else works?
        # See https://stackoverflow.com/questions/8870217/why-do-i-get-sqlalchemy-nested-rollback-error
        db.session.add(self)
        db.session.commit()

    # return a step’s data if there is match by id
    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    # return a campaign’s data if there is match by campaign_id
    @classmethod
    def find_by_campaign(cls, campaign_id):
        return cls.query.filter_by(campaign_id=campaign_id).first()

    @classmethod
    def return_all(cls):
        def to_json(step):
            return {
                'title': step.title,
                'user_id': step.user_id,
                'steps': step.steps,
            }
        return {'steps': list(map(lambda step: to_json(step), StepModel.query.all()))}

    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {'message': '{} rows deleted'.format(num_rows_deleted)}
        except:
            return {'message': 'Something went wrong'}

# Custom validator
def must_not_be_blank(data):
    if not data:
        raise ValidationError('This field cannot be blank')

class StepSchema(Schema):
    id = fields.Int(dump_only=True)
    step_name = fields.Str(required=True, validate=must_not_be_blank)
    email_subject = fields.Str(required=True, validate=must_not_be_blank)
    email_body = fields.Str(required=True, validate=must_not_be_blank)
    campaign_id = fields.Int(required=True, validate=must_not_be_blank)
    created = fields.DateTime(required=True, dump_only=True)

# Initialize schema
step_schema = StepSchema()
steps_schema = StepSchema(many=True)
