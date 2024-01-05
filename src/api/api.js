import Axios from "./axios";

console.log(Axios);

const register = (payload) => {
  console.log(payload);

  return Axios.post("/register", payload); //payload to co ma iść z frontu na backend
};

export { register }; //po przecinku kolejne
