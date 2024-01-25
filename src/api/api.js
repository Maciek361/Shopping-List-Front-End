import Axios from "./axios";

const register = (payload) => {
  return Axios.post("/register", payload);
};

const login = (payload) => {
  return Axios.post("/login", payload);
};

const logout = () => {
  // ten payload moze sie nazywa userCredientials chodzi o to co mi wysyła action ze store.js
  return Axios.post("/logout"); //payload to co ma iść z frontu na backend
};

const fetchUserList = (userId) => {
  return Axios.get(`/user/${userId}/shoppings`);
};

const createNewList = (formData) => {
  return Axios.post("/shopping", formData);
};
const addNewProduct = (productData) => {
  return Axios.post("/product", productData);
};
const fetchCategory = () => {
  return Axios.get("/category");
};
const attachProductToList = (listId, productId) => {
  return Axios.post(`/shopping/${listId}/products/${productId}`);
};

const detachProductFromList = (listId, productId) => {
  return Axios.delete(`/shopping/${listId}/products/${productId}`);
};

const getProductByName = (name) => {
  return Axios.get(`/product?name=${encodeURIComponent(name)}`);
};

const getListById = (id) => {
  return Axios.get(`/shopping/${id}`);
};

const detachUser = (listId, userId) => {
  return Axios.delete(`/user/${userId}/shoppings/${listId}`);
};

const updateProductQuantity = (listId, productId, quantity) => {
  return Axios.post(
    `/shopping/${listId}/products/${productId}/update-quantity`,
    { quantity }
  );
};

const updateChecked = (listId, productId, checked) => {
  return Axios.post(
    `/shopping/${listId}/products/${productId}/update-checked`,
    { checked }
  );
};

const shareList = (listId, email) => {
  return Axios.post(`/shopping/${listId}/share`, { email });
};

export {
  register,
  login,
  logout,
  createNewList,
  fetchUserList,
  attachProductToList,
  detachProductFromList,
  getProductByName,
  getListById,
  detachUser,
  updateProductQuantity,
  updateChecked,
  shareList,
  addNewProduct,
  fetchCategory,
}; //po przecinku kolejne
