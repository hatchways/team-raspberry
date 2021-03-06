import json
from flask import Flask, request, abort
from flask_cors import CORS
import os
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import config
from api.ping_handler import ping_handler
from api.home_handler import home_handler

# For testing
# TODO: REMOVE BEFORE DEPLOYMENT
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
# REMOVES THE NEED FOR THE SCOPE TO BE IN THE SAME ORDER
os.environ['OAUTHLIB_RELAX_TOKEN_SCOPE'] = '1'

# Initializes database connection
db = SQLAlchemy()

# Initialize a migrate instance
migrate = Migrate()

# Initialize bcrypt
flask_bcrypt = Bcrypt()

def create_app():
    flask_app = Flask(__name__)
    flask_app.secret_key = os.environ.get('SECRET_KEY')
   
    CORS(flask_app)
    # Add to database
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    flask_app.register_blueprint(home_handler)
    flask_app.register_blueprint(ping_handler)

    crm_api = Api(flask_app, prefix='/api')

    import resources
    import google_resources
    import campaign_step_resources
    import prospect_campaign_join_resources
    import prospect_step_join_resources

    crm_api.add_resource(resources.UserRegistration, '/registration')
    crm_api.add_resource(resources.UserLogin, '/login')
    crm_api.add_resource(resources.UserLogout, '/logout')
    crm_api.add_resource(resources.AllUsers, '/users')
    crm_api.add_resource(resources.GetUser, '/user')
    crm_api.add_resource(resources.Prospects, '/prospects')
    crm_api.add_resource(resources.AddProspectCsv, '/add/prospectsCsv')
    crm_api.add_resource(resources.ImportProspects, '/import/prospects')
    crm_api.add_resource(google_resources.Authorize, '/authorize')
    crm_api.add_resource(google_resources.OAuth2Callback, '/oauth2callback')
    crm_api.add_resource(campaign_step_resources.StepCreate, '/step_create')
    crm_api.add_resource(campaign_step_resources.StepUpdate, '/step_update')
    crm_api.add_resource(campaign_step_resources.GetCampaignSteps, '/get_campaign_steps')
    crm_api.add_resource(google_resources.EmailProspect, '/email')
    crm_api.add_resource(resources.Campaigns, '/campaigns')
    crm_api.add_resource(resources.CampaignAssign, '/campaigns/assign')
    crm_api.add_resource(prospect_campaign_join_resources.CampaignProspects, '/campaign/prospects')
    crm_api.add_resource(prospect_campaign_join_resources.JoinCreate, '/prospect_campaign_join_create')
    crm_api.add_resource(prospect_campaign_join_resources.GetJoinCount, '/prospect_campaign_count')
    crm_api.add_resource(prospect_step_join_resources.StepProspects, '/step/prospects')
    crm_api.add_resource(prospect_step_join_resources.MoveProspects, '/step/prospects/move')
    

    db.init_app(flask_app)
    migrate.init_app(flask_app, db)

    return flask_app


if __name__ == '__main__':
    flask_app = create_app()
    with flask_app.app_context():
        flask_app.run('0.0.0.0', port=5000)
