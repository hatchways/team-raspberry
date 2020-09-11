# Have to make use of this later
#from resources import login_required
import google.oauth2.credentials
import google_auth_oauthlib.flow
import flask, json, base64, mimetypes
from googleapiclient.discovery import build
from models.users import UserModel
from flask_restful import Resource
from email.mime.text import MIMEText
from email_tasks import send_message
from google.auth.transport.requests import AuthorizedSession

from models.prospects import ProspectModel
import json

# TODO: Change location of Client secrets for deployment
CLIENT_SECRET_FILE = 'credentials.json'
SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]
# Put this in .env file
REDIRECT_URI = 'http://localhost:3000/redirect'
# REDIRECT_URI = 'http://localhost:3000/prospects/redirect'

def credentials_to_dict(credentials):
  return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}

def save_credentials(creds_dict, userId):
  current_user = UserModel.find_by_id(userId)
  if current_user:
    current_user.updateCredentials(creds_dict)
    return "Credentials Saved."
  else:
    return "Current user not found."

class Authorize(Resource):
    def post(self):
        flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(CLIENT_SECRET_FILE, scopes=SCOPES)
        # This is the url that google will append the authorization to 
        flow.redirect_uri = REDIRECT_URI

        authorization_url, state = flow.authorization_url(
            access_type='offline',
            include_granted_scopes='true')

        flask.session['state'] = state
    
        return {
            'url': authorization_url,
            'state': state
        }, 200

class OAuth2Callback(Resource):
    def post(self):
        state = flask.session['state']
        
        flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
            CLIENT_SECRET_FILE, scopes=SCOPES, state=state)
        flow.redirect_uri = REDIRECT_URI
        
        # authorization url
        authorization_response = flask.request.json['url']
        flow.fetch_token(authorization_response=authorization_response)
        
        credentials = flow.credentials
        flask.session['credentials'] = credentials_to_dict(credentials)
        credentialsString = json.dumps(flask.session['credentials'], separators=(',',':'))
        save_credentials(credentialsString, flask.request.json['userId'])

        return {
            'message': 'Permissions Granted',
            'credentials': credentialsString
        }, 200

class EmailProspect(Resource):
    def post(self):
        data = flask.request.json
        credentialData = json.loads(data['credentials'])
        prospectData = data['prospects']
        emailSubjectData = data['email_subject']
        emailBodyData = data['email_body']
        print(credentialData)
        print(prospectData)
        print(emailSubjectData)
        print(emailBodyData)

        #There might have been a nicer way of doing this but python is beyond me
        credentials = google.oauth2.credentials.Credentials(credentialData['token'], credentialData['refresh_token'], None, credentialData['token_uri'], credentialData['client_id'], credentialData['client_secret'], credentialData['scopes'], None)
        
        # Get the user data ( emailAddress, messageTotal, threadsTotal, historyId )
        authed_session = AuthorizedSession(credentials)
        response = authed_session.get('https://www.googleapis.com/gmail/v1/users/me/profile')
        #

        # First thing is first, I tried a different approach at first so I'm not really sure 
        # if u need to install celery, or if the import is enough
        #
        #### celery -A email_tasks worker -P eventlet --loglevel=info ### <-- !IMPORTANT run this in a seperate terminal if you're using windows
        # if you're using a linux based system I believe you can forgo the '-P eventlet'
        #
        # If you'd like to test it for urself just change the Receiver Portion of the email. Eventually we'll just loop through all the 
        # prospects in the campaign and put them as the receiver
        # This can be done in a loop. This is just to test. In order to do a bunch just loop through these two lines only changing the 
        # receiver of the email.        Sender,                           Receiver,              Subject,       Body
        for prospect in prospectData:
            current_prospect = ProspectModel.return_id_prospects(prospect['id'])
            print(current_prospect.email)
            messageToSend = create_message(response.json()['emailAddress'], current_prospect.email, emailSubjectData, emailBodyData)
            send_message.delay(credentialData, 'me', messageToSend)

        return {
            'status': 'success',
            'message': 'Sent the email'
        }, 200

def create_message(sender, to, subject, message_text):
    """Create a message for an email.

    Args:
        sender: Email address of the sender.
        to: Email address of the receiver.
        subject: The subject of the email message.
        message_text: The text of the email message.

    Returns:
        An object containing a base64url encoded email object.
    """

    message = MIMEText(message_text)
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    return {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}
