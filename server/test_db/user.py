# User Model
class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), unique=True)
  email = db.Column(db.String(100), unique=True)
  credentials = db.Column(db.String(500))

  def __init__(self, name, email, credentials):
    self.name = name
    self.email = email
    self.credentials = credentials

# User Schema
class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'email', 'credentials')

# Initialize Schema
# user_schema = UserSchema(strict=True)
user_schema = UserSchema()
# users_schema = UserSchema(many=True, strict=True)
users_schema = UserSchema(many=True)