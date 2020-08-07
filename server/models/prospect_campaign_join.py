import datetime
from app import db
from marshmallow import Schema, fields, ValidationError, pre_load

class ProspectCampaignModel(db.Model):
    __tablename__ = 'prospect_campaign_joins'

    # Assign database fields
    # Autoincrement is implicit default with PK set to True
    id = db.Column(db.BigInteger, primary_key=True)
    campaign_id = db.Column(db.BigInteger, db.ForeignKey("campaigns.id"), nullable=False)
    prospect_id = db.Column(db.BigInteger, db.ForeignKey("prospects.id"), nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    def __init__(self, campaign_id, prospect_id):
        self.campaign_id = campaign_id
        self.prospect_id = prospect_id

    def save_to_db(self):
        # Session can get into a weird state where nothing else works?
        # See https://stackoverflow.com/questions/8870217/why-do-i-get-sqlalchemy-nested-rollback-error
        db.session.add(self)
        db.session.commit()

    # return a step’s data if there is match by id
    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    # return a step’s data if there is match by id
    @classmethod
    def find_by_campaign_id(cls, campaign_id):
        return cls.query.filter_by(campaign_id=campaign_id).first()

    @classmethod
    def count_prospects_in_campaign(cls, campaign_id):
        return len(cls.query.filter_by(campaign_id=campaign_id).all())

    # return a step’s data if there is match by id
    @classmethod
    def find_by_prospect_id(cls, prospect_id):
        return cls.query.filter_by(prospect_id=prospect_id).first()

    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                'id': x.id,
                'campaign_id': x.campaign_id,
                'prospect_id': x.prospect_id
            }
        return {'CampaignProspects': list(map(lambda x: to_json(x), ProspectCampaignModel.query.all()))}

# Custom validator
def must_not_be_blank(data):
    if not data:
        raise ValidationError('This field cannot be blank')

class ProspectCampaignSchema(Schema):
    id = fields.Int(dump_only=True)
    prospect_id = fields.Int(required=True)
    campaign_id = fields.Int(required=True)
    created = fields.DateTime(required=True, dump_only=True)

# Initialize schema
prospect_campaign_schema = ProspectCampaignSchema()
prospect_campaigns_schema = ProspectCampaignSchema(many=True)
