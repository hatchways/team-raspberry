from redis import Redis
from celery import Celery
from googleapiclient.discovery import build
import google.oauth2.credentials

r = Redis(host="redis://localhost:6379")
app = Celery('email_tasks', broker='redis://localhost')

@app.task
def send_message(data, user_id, message):
  """Send an email message.

  Args:
    service: Authorized Gmail API service instance.
    user_id: User's email address. The special value "me"
    can be used to indicate the authenticated user.
    message: Message to be sent.

  Returns:
    Sent Message.
  """
  credentialData = data['credentials']
  credentials = google.oauth2.credentials.Credentials(credentialData['token'], credentialData['refresh_token'], None, credentialData['token_uri'], credentialData['client_id'], credentialData['client_secret'], credentialData['scopes'], None)
  
  service = build('gmail', 'v1', credentials=credentials)
  message = (service.users().messages().send(userId=user_id, body=message)
            .execute())