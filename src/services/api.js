import axios from "axios";

const api = axios.create({
  baseURL: "https://api.thedogapi.com/v1/",
  headers: {'x-api-key': '666eca98-e3bb-4fc2-a47e-786bb32d4ed2'}
});

export default api;