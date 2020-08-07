from redis import Redis
from celery import Celery
from googleapiclient.discovery import build
from decouple import config
import google.oauth2.credentials

r = Redis(host=config('REDIS_HOST'))
app = Celery('email_tasks', broker=config('CELERY_BROKER'))

@app.task
def send_message(credentialData, user_id, message):
  """Send an email message.

  Args:
    service: Authorized Gmail API service instance.
    user_id: User's email address. The special value "me"
    can be used to indicate the authenticated user.
    message: Message to be sent.

  Returns:
    Sent Message.
  """
  print(credentialData)
  credentials = google.oauth2.credentials.Credentials(credentialData['token'], credentialData['refresh_token'], None, credentialData['token_uri'], credentialData['client_id'], credentialData['client_secret'], credentialData['scopes'], None)
  
  service = build('gmail', 'v1', credentials=credentials)
  message = (service.users().messages().send(userId=user_id, body=message)
            .execute())