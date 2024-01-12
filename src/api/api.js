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
  return Axios.get(`/user/${userId}/shoppings`);
};

const createNewList = (formData) => {
  return Axios.post("/shopping", formData);
};
const detachUserFromList = (listId, userId) => {
  return Axios.delete(`/shopping/${listId}/users/${userId}`);
};
const attachProductToList = (listId, productId) => {
  return Axios.post(`/shopping/${listId}/products/${productId}`);
};
const detachProductFromList = (listId, productId) => {
  return Axios.delete(`/shopping/${listId}/products/${productId}`);
};

export {
  register,
  login,
  createNewList,
  fetchUserList,
  attachProductToList,
  detachProductFromList,
  detachUserFromList,
}; //po przecinku kolejne
