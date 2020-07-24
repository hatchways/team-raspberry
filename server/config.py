import os

TEAM_NAME = os.environ.get('TEAM_NAME')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
# SQLALCHEMY_DATABASE_URI = f'postgresql://{DB_USER}:{DB_PASSWORD}@localhost/crm_test'
SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:hatchways@localhost/hatchways_crm'

SECRET_KEY = os.environ.get('SECRET_KEY')
BCRYPT_LOG_ROUNDS = 12
