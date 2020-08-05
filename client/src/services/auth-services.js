import axios from "axios";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

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

async function getCampaigns() {
  // TODO: Use actual request once the backend endpoint is created.
  // return await axios.get("/api/campaigns");
  return {data: { campaigns: [
    {id: 1, title: 'campaign1', created: 'August 4', prospects: 2, replies: 2, steps: 2  },
    {id: 2, title: 'campaign1', created: 'August 4', prospects: 2, replies: 2, steps: 2  },
    {id: 3, title: 'campaign2', created: 'August 4', prospects: 2, replies: 2, steps: 2  },
    {id: 4, title: 'campaign1', created: 'August 4', prospects: 2, replies: 2, steps: 2  }
  ]}};
}

async function createCampaign(name) {
  let body = {
    name: name
  };
  return await axios.post("/api/campaigns", body);
}

export { getUser, login, registration, getProspects, getCampaigns, createCampaign};
