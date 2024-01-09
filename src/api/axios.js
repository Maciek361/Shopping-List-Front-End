import axios from "axios";
import router from "../router";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const URL = error.config.url;
    const status = error.response.status;
    const store = router.store;

    if (status === 401 && URL !== "/login") {
      router.push("/login");
      store.dispatch("logout");

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
