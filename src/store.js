import { login, fetchUserList, createNewList } from "./api/api";

export default {
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
    clearState(state) {
      state.list = [];
      state.user = null;
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
        return Promise.reject(error);
      }
    },
    async userListFetch({ commit }, userId) {
      try {
        const response = await fetchUserList(userId);

        commit("setList", response.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async createNewList({ commit }, userId) {
      try {
        const response = await createNewList(userId);

        commit("addToList", response.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    logout({ commit }) {
      localStorage.removeItem("userToken");
      commit("clearState");
    },
  },
  getters: {
    getUserId: (state) => (state.user ? state.user.id : null),
    getShoppingLists: (state) => state.list,
    getShoppingListById: (state) => (id) =>
      state.list.find((l) => l.id === parseInt(id)),
    isUserAuthenticated: (state) => state.user != null,
  },
};
