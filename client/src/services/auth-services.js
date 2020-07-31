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

export { getUser, login, registration, getProspects};
