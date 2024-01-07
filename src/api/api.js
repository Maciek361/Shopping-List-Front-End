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
const AddProductToList = (formData, token) => {
  return Axios.post(
    "http://127.0.0.1:8000/api/shopping/{shopping}/products/{product}",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
// const getShoppingList = () => {
//   return Axios.get("http://127.0.0.1:8000/api/shopping/");
// };
const getShoppingList = (token) => {
  try {
    return Axios.get("http://127.0.0.1:8000/api/shopping/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw error;
  }
};
export { register, login, CreateNewList, AddProductToList, getShoppingList }; //po przecinku kolejne
