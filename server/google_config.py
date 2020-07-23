import os

# Configuration
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)
SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  # 'https://www.googleapis.com/auth/userinfo.email',
  # 'https://www.googleapis.com/auth/userinfo.profile',
]
API_SERVICE_NAME = 'gmail'
API_VERSION = 'v1'