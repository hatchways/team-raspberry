# from app import create_app, db
# from passlib.hash import pbkdf2_sha256 as sha256
# from marshmallow import Schema, fields, ValidationError, pre_load

# # Google Auth Model
# class Google(db.Model):
#   id = db.Column(db.Integer, primary_key=True)
#   name = db.Column(db.String(100))
#   email = db.Column(db.String(100))
#   credentials = db.Column(db.String(500))

#   def __init__(self, name, email, credentials):
#     self.name = name
#     self.email = email
#     self.credentials = credentials

# # Google Schema
# class GoogleSchema(Schema):
#   class Meta:
#     fields = ('id', 'name', 'email', 'credentials')

# # Initialize schema
# google_schema = GoogleSchema()
# # googles_schema = GoogleSchema(many=True)