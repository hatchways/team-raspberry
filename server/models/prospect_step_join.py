import datetime
from app import db
from marshmallow import Schema, fields, ValidationError, pre_load

class ProspectStepModel(db.Model):
    __tablename__ = 'prospect_step_joins'

    # Assign database fields
    # Autoincrement is implicit default with PK set to True
    id = db.Column(db.BigInteger, primary_key=True)
    step_id = db.Column(db.BigInteger, db.ForeignKey("campaign_steps.id"), nullable=False)
    prospect_id = db.Column(db.BigInteger, db.ForeignKey("prospects.id"), nullable=False)
    email_sent = db.Column(db.Boolean, nullable=False, default=False)
    email_opened = db.Column(db.Boolean, nullable=False, default=False)
    email_replied = db.Column(db.Boolean, nullable=False, default=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    def __init__(self, step_id, prospect_id):
        self.step_id = step_id
        self.prospect_id = prospect_id

    def save_to_db(self):
        # Session can get into a weird state where nothing else works?
        # See https://stackoverflow.com/questions/8870217/why-do-i-get-sqlalchemy-nested-rollback-error
        db.session.add(self)
        db.session.commit()

    def update_email_status(self):
      if not self.email_sent:
        self.email_sent = True
      elif not self.email_opened:
        self.email_opened = True
      else:
        self.email_replied = True

    # return a step’s data if there is match by id
    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    # return a step’s data if there is match by id
    @classmethod
    def find_by_step_id(cls, step_id):
        return cls.query.filter_by(step_id=step_id).first()

    # return a step’s data if there is match by id
    @classmethod
    def find_by_prospect_id(cls, prospect_id):
        return cls.query.filter_by(prospect_id=prospect_id).first()

    # add find method for email sent, opened, replied on a per campaign basis

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

class ProspectStepSchema(Schema):
    id = fields.Int(dump_only=True)
    prospect_id = fields.Int(required=True)
    step_id = fields.Int(required=True)
    email_sent = fields.Boolean(required=True)
    email_opened = fields.Boolean(required=True)
    email_replied = fields.Boolean(required=True)
    created = fields.DateTime(required=True, dump_only=True)

# Initialize schema
prospect_step_schema = ProspectStepSchema()
prospect_steps_schema = ProspectStepSchema(many=True)
