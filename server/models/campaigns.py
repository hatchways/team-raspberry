import datetime
from app import db
from marshmallow import Schema, fields, ValidationError, pre_load

class CampaignModel(db.Model):
    __tablename__ = "campaigns"

    # Assign database fields
    # Autoincrement is implicit default with PK set to True
    id = db.Column(db.BigInteger, primary_key=True)
    # Figure out how to make a unique clause where the combination between user_id and campaign title must be unique
    title = db.Column(db.String(200), unique=True, nullable=False)
    steps = db.relationship("StepModel", backref="campaign", lazy=True)
    prospects = db.relationship("ProspectCampaignModel", backref="campaign", lazy=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey("users.id"), nullable=False)
    reply_count = db.Column(db.BigInteger, nullable=False, default=0)
    prospect_count = db.Column(db.BigInteger, nullable=False, default=0)
    created = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    def __init__(self, title, user_id, steps):
    # def __init__(self, title, steps):
        self.title = title
        self.user_id = user_id
        self.steps = steps

    def save_to_db(self):
        # Session can get into a weird state where nothing else works?
        # See https://stackoverflow.com/questions/8870217/why-do-i-get-sqlalchemy-nested-rollback-error
        db.session.add(self)
        db.session.commit()

    def count_prospects(self):
        db.query(core.Author.name, func.count(core.Author.id)).join(core.Author.papers).group_by(core.Author.id).all()

    # return a campaign’s data if there is match by title
    @classmethod
    def find_by_title(cls, title):
        return cls.query.filter_by(title=title).first()

    # return a campaign’s data if there is match by user_id
    @classmethod
    def find_by_user(cls, user_id):
        return cls.query.filter_by(user_id=user_id).first()

    @classmethod
    def find_by_id(cls, id):
      return cls.query.filter_by(id=id).first()

    @classmethod
    def return_user_campaigns(cls, user):
        return cls.query.filter_by(user_id=user).all()

    @classmethod
    def return_all(cls):
        def to_json(campaign):
            return {
                "title": campaign.title,
                "user_id": campaign.user_id,
                "steps": campaign.steps,
            }
        return {"campaigns": list(map(lambda campaign: to_json(campaign), CampaignModel.query.all()))}

    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {"message": "{} rows deleted".format(num_rows_deleted)}
        except:
            return {"message": "Something went wrong"}

# Custom validator
def must_not_be_blank(data):
    if not data:
        raise ValidationError("This field cannot be blank")

class CampaignSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True, validate=must_not_be_blank)
    user_id = fields.Int(required=True, validate=must_not_be_blank)
    created = fields.DateTime(required=True, dump_only=True)

# Initialize schema
campaign_schema = CampaignSchema()
campaigns_schema = CampaignSchema(many=True)
