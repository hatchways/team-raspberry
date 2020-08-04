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

async function authPost() {
  return await axios.post("/api/authorize");
}

async function oauthPost(url) {
  return await axios.post("/api/oauth2callback", url);
}

async function sendEmail(credentials) {
  return await axios.post("/api/email", credentials);
}

export {
  getUser,
  login,
  registration,
  getProspects,
  authPost,
  oauthPost,
  sendEmail,
};
