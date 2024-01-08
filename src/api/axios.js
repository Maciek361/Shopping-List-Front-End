import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.interceptors.request.use(
  (config) => {
    // Get the token from wherever you store it (e.g., localStorage, Vuex store)
    const token = localStorage.getItem("userToken");

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default instance;
