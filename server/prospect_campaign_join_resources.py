from models.campaigns import CampaignModel, campaign_schema, campaigns_schema
from models.campaign_steps import StepModel, step_schema, steps_schema
from  models.prospect_step_join import ProspectStepModel, prospect_step_schema, prospect_steps_schema
from  models.prospect_campaign_join import ProspectCampaignModel, prospect_campaign_schema, prospect_campaigns_schema
from models.prospects import ProspectModel, prospect_schema
from models.users import UserModel, user_schema, users_schema
from resources import login_required
from flask_restful import Resource
from flask import request, session
import io, csv, redis, json


class CampaignProspects(Resource):
    def get(self):
        campaign_id = request.args['campaign_id']
        
        prospects = ProspectCampaignModel.return_all_by_campaign_id(campaign_id)
        allProspects = []

        for prospect in prospects:
            allProspects.append(prospect.prospect_id)

        return {'prospects': allProspects}
        

class JoinCreate(Resource):
    def post(self):
        data = prospect_campaign_schema.load(request.json)
        print(data)

        new_join = ProspectCampaignModel(
            campaign_id = data['campaign_id'],
            prospect_id = data['prospect_id']
        )

        try:
            new_join.save_to_db()
            responseObject = {
                'status': 'success',
                'message': 'Step was created',
                'step': {
                    'campaign_id': new_join.campaign_id,
                    'prospect_id': new_join.prospect_id
                }
            }
            
            return responseObject, 201
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Something went wrong. Please try again.'
            }
            return responseObject, 500

class GetJoinCount(Resource):
    def get(self):
        count = ProspectCampaignModel.count_prospects_in_campaign(request['campaign_id'])
        responseObject = {
            'count': count
        }

        return responseObject, 200