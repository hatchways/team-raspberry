from typing import List, Any
from functools import wraps
from models.prospects import ProspectModel, prospect_schema, prospects_schema
from models.campaigns import CampaignModel, campaign_schema, campaigns_schema
from models.campaign_steps import StepModel, step_schema, steps_schema
from models.prospect_step_join import ProspectStepModel, prospect_step_schema, prospect_steps_schema
from flask_restful import Resource
from flask import request, session
import io, csv, redis, json
import login_required from Resource

@login_required
class CreateCampaign(Resource):
    def post(self):
        data = campaign_schema.load(request.json)
        # Check if campaign already exists
        if CampaignModel.find_by_title(data['title']):
            return {'message': 'Campaign {} already exists'.format(data['title'])}, 409

        new_campaign = CampaignModel(
            title = data['title'],
            user_id = data['user_id'],
        )

        try:
            new_campaign.save_to_db()
            responseObject = {
                'status': 'success',
                'message': 'Campaign {} was created'.format(data['title']),
                'campaign': {
                    'title': new_campaign.title,
                }
            }
            
            return responseObject, 201
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Something went wrong. Please try again.'
            }
            return responseObject, 500

class EditCampaign(Resource):
  def post(self):
    data = campaign_schema.load(request.json)
    # Check if campaign already exists
    if CampaignModel.find_by_title(data['title']):

      campaign = CampaignModel.find_by_title(data['title'])
      campaign.title = data['title']

      try:
        campaign.save_to_db()
        responseObject = {
          'status': 'success',
          'message': 'Campaign {} was created'.format(data['title']),
          'campaign': {
            'title': new_campaign.title,
          }
        }
          
        return responseObject, 201
      except Exception as e:
        responseObject = {
            'status': 'fail',
            'message': 'Something went wrong. Please try again.'
        }
        return responseObject, 500
    else:
      return {'message': 'Campaign {} already exists'.format(data['title'])}, 409
