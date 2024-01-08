import { createStore } from "vuex";
import { login } from "./api/api";
import { fetchUserList } from "./api/api";

export default createStore({
  state: {
    user: null,
    list: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setList(state, list) {
      state.list = list;
    },
  },
  actions: {
    async loginUser({ commit }, userCredentials) {
      try {
        const response = await login(userCredentials); //tutaj są dane z inputów jakie podaje jak sie loguje

        const token = response.data.token;

        localStorage.setItem("userToken", token);

        commit("setUser", response.data.user); //commituje tylko mutations
      } catch (error) {
        console.error("Login failed:", error);
        return Promise.reject(error);
      }
    },
    async userListFetch({ commit }, userId) {
      try {
        const response = await fetchUserList(userId);

        commit("setList", response.data);
      } catch (error) {
        console.error("Nie pobrano listy:", error);
      }
    },
  },
  getters: {
    getUserId: (state) => (state.user ? state.user.id : null),
    getShoppingLists: (state) => state.list,
    isUserAuthenticated: (state) => state.user != null,
  },
});
