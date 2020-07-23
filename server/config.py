import os

TEAM_NAME = os.environ.get('TEAM_NAME')
# TODO: Move this into a secrets file or something that's not committed (unfortunately .env is).
SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:hatchways@localhost/hatchways_crm'
SECRET_KEY = os.environ.get('SECRET_KEY')
