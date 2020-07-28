
from models.users import UserModel, user_schema, users_schema
from flask_restful import Resource
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery
import webbrowser
import requests
import flask
import json
import os

# TODO: Change location of Client secrets for deployment
CLIENT_SECRETS_FILE = '/Users/kevinkaminski/Downloads/client_secret.json'
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)
SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
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

def save_credentials(creds_dict):
  #TODO: Grab current user
  current_user = UserModel.find_by_id("someone@gmail.com")
  if current_user:
    current_user.updateCredentials(creds_dict)
    return "Credentials Saved."
  else:
    return "Current user not found."

class Authorize(Resource):
  # def authorize():
  def post(self):
    # TODO: check if current user already has credentials. If they do, pass refresh token - don't go through whole auth process again.
    
    # Create flow instance to manage the OAuth 2.0 Authorization Grant Flow steps.
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(CLIENT_SECRETS_FILE, scopes=SCOPES)

    # The URI created here must exactly match one of the authorized redirect URIs
    # for the OAuth 2.0 client, which you configured in the API Console. If this
    # value doesn't match an authorized URI, you will get a 'redirect_uri_mismatch'
    # error.

    flow.redirect_uri = (flask.request.json['redirect_url'] + '/redirect')
    authorization_url, state = flow.authorization_url(
        # Enable offline access so that you can refresh an access token without
        # re-prompting the user for permission. Recommended for web server apps.
        access_type='offline',
        # Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes='true'
        )
    # Store the state so the callback can verify the auth server response.
    flask.session['state'] = state
    return {"url": authorization_url}, 200

class OAuth2Callback(Resource):
  # def oauth2callback():
  def post(self):
    # print(flask.request.json)
    # Specify the state when creating the flow in the callback so that it can
    # verified in the authorization server response.
    state = flask.session['state']
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=None, state=state)
    flow.redirect_uri = flask.request.json['redirect_url']

    # Use the authorization server's response to fetch the OAuth 2.0 tokens.
    authorization_response = flask.request.json["url"]
    print(flask.request.json)
    flow.fetch_token(authorization_response=authorization_response)

    # Store credentials in the session.
    # ACTION ITEM: In a production app, you likely want to save these
    #              credentials in a persistent database instead.
    credentials = flow.credentials
    creds_dict = credentials_to_dict(credentials)
    save_credentials(creds_dict)
    return creds_dict, 200