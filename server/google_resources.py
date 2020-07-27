from models.users import UserModel, user_schema, users_schema
from flask_restful import Resource
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery
import models.google
import webbrowser
import requests
import flask
import json
import os

# Configuration
# GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
# GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
CLIENT_SECRETS_FILE = '/Users/kevinkaminski/Downloads/client_secret.json'
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)
SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]
API_SERVICE_NAME = 'gmail'
API_VERSION = 'v1'

def credentials_to_dict(credentials):
  return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}

def save_credentials(credentials):
  #TODO: Grab current user's email
  current_user = UserModel.find_by_email("someone@gmail.com")
  if current_user:
    credentials_dict = credentials_to_dict(credentials)
    current_user.updateCredentials(credentials_dict)
    return "Credentials Saved."
  else:
    return "Current user not found."

class TestAPIRequest(Resource):
  # def test_api_request(): # TODO: Change from google drive request.
  def get(self): # TODO: Change from google drive request.
    if 'credentials' not in flask.session:
      return flask.redirect('authorize')

    # Load credentials from the session.
    credentials = google.oauth2.credentials.Credentials(
        **flask.session['credentials'])

    drive = googleapiclient.discovery.build(
        API_SERVICE_NAME, API_VERSION, credentials=credentials)

    # files = drive.files().list().execute()

    # Save credentials back to session in case access token was refreshed.
    # ACTION ITEM: In a production app, you likely want to save these
    #              credentials in a persistent database instead.
    flask.session['credentials'] = credentials_to_dict(credentials)

    return credentials_to_dict(credentials)

class GoToAuthorize(Resource):
  def get(self):
    webbrowser.open_new_tab("http://localhost:5000/authorize")

class Authorize(Resource):
  # def authorize():
  def post(self):
    # TODO: check if current user already has credentials. If they do, pass refresh token - don't go through whole auth process again.
    
    # Create flow instance to manage the OAuth 2.0 Authorization Grant Flow steps.
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES)

    # The URI created here must exactly match one of the authorized redirect URIs
    # for the OAuth 2.0 client, which you configured in the API Console. If this
    # value doesn't match an authorized URI, you will get a 'redirect_uri_mismatch'
    # error.
    flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

    authorization_url, state = flow.authorization_url(
        # Enable offline access so that you can refresh an access token without
        # re-prompting the user for permission. Recommended for web server apps.
        access_type='offline',
        # Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes='true'
        )

    # Store the state so the callback can verify the auth server response.
    flask.session['state'] = state

    # return flask.redirect(authorization_url)
    return {"url": authorization_url}

class OAuth2Callback(Resource):
  # def oauth2callback():
  def get(self):
    # Specify the state when creating the flow in the callback so that it can
    # verified in the authorization server response.
    state = flask.session['state']

    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=None, state=state)
    flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

    # Use the authorization server's response to fetch the OAuth 2.0 tokens.
    authorization_response = flask.request.url
    flow.fetch_token(authorization_response=authorization_response)

    # Store credentials in the session.
    # ACTION ITEM: In a production app, you likely want to save these
    #              credentials in a persistent database instead.
    credentials = flow.credentials
    # new_google_auth = GoogleAuth(credentials=credentials)
    # db.session.add(new_google_auth)
    # db.session.commit()
    # flask.session['credentials'] = credentials_to_dict(credentials)

    # return flask.redirect(flask.url_for('testapirequest'))
    save_credentials(credentials_to_dict(credentials))
    return flask.redirect("http://localhost:3000/authorize")

class Revoke(Resource):
  # def revoke():
  def get(self):
    if 'credentials' not in flask.session:
      return ('You need to <a href="/authorize">authorize</a> before ' +
              'testing the code to revoke credentials.')

    credentials = google.oauth2.credentials.Credentials(
      **flask.session['credentials'])

    revoke = requests.post('https://oauth2.googleapis.com/revoke',
        params={'token': credentials.token},
        headers = {'content-type': 'application/x-www-form-urlencoded'})

    status_code = getattr(revoke, 'status_code')
    if status_code == 200:
      return('Credentials successfully revoked.' + print_index_table())
    else:
      return('An error occurred.' + print_index_table())
