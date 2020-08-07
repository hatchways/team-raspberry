import os

TEAM_NAME = os.environ.get('TEAM_NAME')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
SQLALCHEMY_DATABASE_URI = f'postgresql://{DB_USER}:{DB_PASSWORD}@localhost/crm_test'
SECRET_KEY = os.environ.get('SECRET_KEY')
BCRYPT_LOG_ROUNDS = 12

# The environment variables need to be available or nothing will work so throw an error if they're not set
assert SECRET_KEY
assert DB_USER
assert DB_PASSWORD
assert SQLALCHEMY_DATABASE_URI
