# Google Auth Model
class GoogleAuth(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  email = db.Column(db.String(100))
  credentials = db.Column(db.String(500))

  def __init__(self, name, email, credentials):
    self.name = name
    self.email = email
    self.credentials = credentials

# User Schema
class GoogleAuthSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'email', 'credentials')