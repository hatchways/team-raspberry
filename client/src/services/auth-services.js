import axios from "axios";

async function getUser() {
  const response = await axios.post("/api/user");

  return response;
}

async function login(formValues) {
  const response = await axios.post("/api/login", formValues);
  return response;
}

async function logout() {
  return await axios.post("/api/logout");
}

async function registration(formValues) {
  const response = await axios.post("/api/registration", formValues);
  return response;
}

async function getProspects() {
  return await axios.get("/api/prospects");
}

async function authPost() {
  return await axios.post("/api/authorize");
}

async function oauthPost(url) {
  return await axios.post("/api/oauth2callback", url);
}

async function sendEmail(body) {
  return await axios.post("/api/email", body);
}

async function getCampaigns() {
  return await axios.get("/api/campaigns");
}

async function createCampaign(name) {
  let body = {
    title: name,
  };
  return await axios.post("/api/campaigns", body);
}

async function assignToCampaign(campaignId, prospects) {
  let body = {
    campaignId: campaignId,
    prospects: prospects,
  };
  return await axios.post("/api/campaigns/assign", body);
}

async function createStep(step) {
  let body = { ...step };
  return await axios.post("/api/step_create", body);
}

async function getCampaignSteps(campaignId) {
  return await axios.get(`/api/get_campaign_steps?campaign_id=${campaignId}`);
}

async function getCampaignProspects(campaignId, stepName) {
  return await axios.get(
    `/api/campaign/prospects?campaign_id=${campaignId}&step_name=${stepName}`
  );
}

async function getProspectSteps(stepId) {
  return await axios.get(`/api/step/prospects?step_id=${stepId}`);
}

async function addProspectsToStep(body) {
  return await axios.post("/api/step/prospects", body);
}
async function moveProspectsToStep(body) {
  return await axios.post("/api/step/prospects/move", body);
}

export {
  getUser,
  login,
  logout,
  registration,
  getProspects,
  authPost,
  oauthPost,
  sendEmail,
  getCampaigns,
  createCampaign,
  assignToCampaign,
  createStep,
  getCampaignSteps,
  getCampaignProspects,
  moveProspectsToStep,
  getProspectSteps,
  addProspectsToStep,
};
