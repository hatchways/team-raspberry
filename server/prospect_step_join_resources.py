from flask_restful import Resource
from flask import request, session
from models.prospect_step_join import ProspectStepModel, prospect_step_schema, prospect_steps_schema
from models.prospects import ProspectModel,prospect_schema,prospects_schema

class StepProspects(Resource):
    def get(self):
        data = request.args['step_id']
        current_prospects = ProspectStepModel.find_by_all_prospects_by_step_id(data)
        
        

        prospects = []
        for prospect in current_prospects:
            stepProspects = {
                'id': prospect.id,
                'step_id': prospect.step_id,
                'prospect_id': prospect.prospect_id,
                'email_sent': prospect.email_sent,
                'email_opened': prospect.email_opened,
                'email_replied': prospect.email_opened
            }
            prospects.append(stepProspects)
        
        if (len(prospects) == 0):
            return {
                'message': 'no prospects',
                'prospects': prospects
            }, 201
        

        return {
            'message': 'There are some prospects',
            'prospects': prospects
        }, 200
    def post(self):
        data = request.json

        prospects = []
        for prospect_id in data['prospects']:
            current_prospect = ProspectModel.return_id_prospects(prospect_id)
            prospect = {
                'id': current_prospect.id,
                'email': current_prospect.email,
                'firstName': current_prospect.firstName,
                'lastName': current_prospect.lastName
            }

            new_prospect_step = ProspectStepModel(data['step_id'], prospect_id)
            new_prospect_step.save_to_db()
            prospects.append(prospect)

        return {
            'message': 'Added prospects',
            'prospects': prospects
        }, 200

class MoveProspects(Resource):
    def post(self):
        data = request.json
        data['steps_with_prospects'][data['old_index']]['prospects'] = []
        step_prospects = data['prospects']
        
        for step_prospect in step_prospects:
            current_step_prospect = ProspectStepModel.find_by_id(step_prospect['id'])
            current_step_prospect.move_prospect_to_new_step(data['new_step_id'])
            responseObject = {
                'id': current_step_prospect.id,
                'step_id': current_step_prospect.step_id,
                'prospect_id': current_step_prospect.prospect_id,
                'email_sent': current_step_prospect.email_sent,
                'email_opened': current_step_prospect.email_opened,
                'email_replied': current_step_prospect.email_replied
            }
            data['steps_with_prospects'][data['new_index']]['prospects'].append(responseObject)

        print(data['steps_with_prospects'])

        
        return {
            'message': 'Prospects have been moved',
            'step_prospects': data['steps_with_prospects']
        }, 200
    