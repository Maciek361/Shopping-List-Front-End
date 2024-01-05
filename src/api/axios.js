import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance;
