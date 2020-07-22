from app import db

class UserModel(db.Model):
    __tablename__ = 'users'

    # Should autoincrement (this is the implicit default with PK set to True; result is a bigserial column.
    id = db.Column(db.BigInteger, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
