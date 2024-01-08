import Axios from "./axios";

console.log(Axios);

const register = (payload) => {
  console.log(payload);

  return Axios.post("/register", payload); //payload to co ma iść z frontu na backend
};
const login = (payload) => {
  console.log(payload);

  return Axios.post("/login", payload); //payload to co ma iść z frontu na backend
};
const CreateNewList = (formData, token) => {
  return Axios.post("http://127.0.0.1:8000/api/shopping", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
const baseUrl = "http://127.0.0.1:8000";
const userId = "17";
Axios.get(`${baseUrl}/api/user/${userId}/shoppings`)
  .then((response) => {
    // Handle the successful response
    console.log("api.js Response:", response.data);
  })
  .catch((error) => {
    // Handle errors
    console.error("Error:", error.message);
  });

export { register, login, CreateNewList }; //po przecinku kolejne
