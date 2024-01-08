import { createStore } from "vuex";
import { login } from "./api/api";

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async loginUser({ commit }, userData) {
      try {
        // Assuming the login function is in your api.js file
        const response = await login(userData);

        // Assuming the response.data contains user information
        const user = response.data.user;
        // const userId = response.data.user.id;
        // console.log("User ID from login action:", userId);
        // Commit the user data to the store
        commit("setUser", response.data.user);
      } catch (error) {
        console.error("Login failed:", error);
        // Optionally, you can handle login failure here
        // For example, show an error message to the user
      }
    },
  },
  getters: {
    getUserId: (state) => (state.user ? state.user.id : null),
  },
});
