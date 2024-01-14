import {
  login,
  logout,
  fetchUserList,
  createNewList,
  getListById,
  detachUser,
} from "./api/api";

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
    updateList(state, list) {
      const newList = state.list;
      const flist = newList.find((l) => l.id === list.id);

      if (flist) {
        const idx = newList.indexOf(flist);
        newList.splice(idx, 1, list);
      } else {
        newList.push(list);
      }

      state.list = newList;
    },
    removeList(state, listId) {
      const newList = state.list;

      newList.find((l) => l.id === listId);

      if (newList) {
        const idx = newList.indexOf(newList);

        if (idx) {
          newList.splice(idx, 1);
        }

        state.list = newList;
      }
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
    async showListById({ commit }, listId) {
      try {
        const response = await getListById(listId);

        commit("updateList", response.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async detachUserFromList({ commit }, { listId, userId }) {
      try {
        const response = await detachUser(listId, userId);

        //commit("removeList", listId);
        return Promise.resolve(response.data.message);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async logout({ commit }) {
      try {
        await logout();

        localStorage.removeItem("userToken");
        commit("clearState");

        return Promise.resolve("logged-out");
      } catch (error) {
        return Promise.reject(error);
      }
    },
    clearStore({ commit }) {
      localStorage.removeItem("userToken");
      commit("clearState");
    },
  },
  getters: {
    getUserId: (state) => (state.user ? state.user.id : null),
    getShoppingLists: (state) => state.list,
    isUserAuthenticated: (state) => state.user != null,
    getShoppingListById: (state) => (id) => {
      const list = state.list.find((l) => l.id === parseInt(id));

      const products = list.products;
      const quantities = list.quantities;

      const productsWithQuantities = products.reduce((prev, curr) => {
        const quantityObj = quantities.find((q) => q.product_id === curr.id);

        prev.push({
          ...curr,
          quantity: quantityObj.quantity,
          checked: quantityObj.checked,
        });

        return prev;
      }, []);

      // get categories from whole list and remove duplicates....
      const categories = products
        .map((p) => p.category)
        .reduce((prev, curr) => {
          if (!prev.find((p) => p.id === curr.id)) {
            prev.push(curr);

            return prev;
          }

          return prev;
        }, []);

      // match products with categories
      const categoriesWithProducts = categories.map((category) => {
        const allProductsForCategory = productsWithQuantities.filter(
          (product) => product.category.id === category.id
        );

        // map product to trash useless fields
        return {
          ...category,
          products: allProductsForCategory.map((p) => ({
            id: p.id,
            name: p.name,
            checked: p.checked,
            quantity: p.quantity,
          })),
        };
      });

      // map complete list and remove useless data
      return {
        id: list.id,
        name: list.name,
        created_at: list.created_at,
        categories: categoriesWithProducts,
        user_id: list.user_id,
        users: list.users,
        updated_at: list.updated_at,
      };
    },
  },
};
