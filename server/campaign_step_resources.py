from typing import List, Any
from functools import wraps
from models.campaigns import CampaignModel, campaign_schema, campaigns_schema
from models.campaign_steps import StepModel, step_schema, steps_schema
from  models.prospect_step_join import ProspectStepModel, prospect_step_schema, prospect_steps_schema
from models.prospects import ProspectModel, prospect_schema
from models.users import UserModel, user_schema, users_schema
from resources import login_required
from flask_restful import Resource
from flask import request, session
import io, csv, redis, json


class StepCreate(Resource):
    def post(self):
        data = step_schema.load(request.json)

        new_step = StepModel(
            step_name = data['step_name'],
            email_subject = data['email_subject'],
            email_body = data['email_body'],
            campaign_id = data['campaign_id'],
        )

        try:
            new_step.save_to_db()
            responseObject = {
                'status': 'success',
                'message': 'Step was created',
                'step': {
                    'id': new_step.id,
                    'email_subject': new_step.email_subject,
                    'email_body': new_step.email_body,
                    'campaign_id': new_step.campaign_id,
                }
            }
            
            return responseObject, 201
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Something went wrong. Please try again.'
            }
            return responseObject, 500

class StepUpdate(Resource):
    def post(self):
        data = request.json
        step = StepModel.find_by_campaign(data['campaign_id'])
        StepModel.update_step(data)

        if step is None:
            responseObject = {
                'status': 'fail',
                'message': 'No such step'
            }
            return responseObject, 401
        else:
            responseObject = {
                'status': 'success',
                'message': 'Successfully updated step.',
            }
            return responseObject, 200


class GetCampaignSteps(Resource):

    @login_required
    def get(self):
        steps = StepModel.find_by_campaign(request.json['campaign_id'])

        responseObject = {
            'steps': steps
        }

        return responseObject, 200