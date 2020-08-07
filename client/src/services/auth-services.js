import axios from "axios";

async function getUser() {
  const response = await axios.post("/api/user");

  return response;
}

async function login(formValues) {
  const response = await axios.post("/api/login", formValues);
  return response;
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

async function sendEmail(credentials) {
  return await axios.post("/api/email", credentials);
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
    prospects: prospects
  };
  return await axios.post("/api/campaigns/assign", body);
}

export {
  getUser,
  login,
  registration,
  getProspects,
  authPost,
  oauthPost,
  sendEmail,
  getCampaigns,
  createCampaign,
  assignToCampaign,
};
