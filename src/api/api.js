import Axios from "./axios";

const register = (payload) => {
  console.log(payload);

  return Axios.post("/register", payload); //payload to co ma iść z frontu na backend
};
const login = (payload) => {
  // ten payload moze sie nazywa userCredientials chodzi o to co mi wysyła action ze store.js
  return Axios.post("/login", payload); //payload to co ma iść z frontu na backend
};

const fetchUserList = (userId) => {
  return Axios.get(`http://127.0.0.1:8000/api/user/${userId}/shoppings`);
};

const createNewList = (formData) => {
  return Axios.post("http://127.0.0.1:8000/api/shopping", formData);
};
// const userId = "17";
// Axios.get(`/api/user/${userId}/shoppings`)
//   .then((response) => {
//     console.log("api.js Response:", response.data);
//   })
//   .catch((error) => {
//     // Handle errors
//     console.error("Error:", error.message);
//   });

export { register, login, createNewList, fetchUserList }; //po przecinku kolejne
