import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import AddShoppingListView from "../views/AddShoppingListView.vue";
import store from "../store";

const isUserAuthenticated = () =>
  store.getters.isUserAuthenticated ? true : "login";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: () => isUserAuthenticated(),
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/shopping",
      name: "addNewList",
      component: AddShoppingListView,
    },
  ],
});

export default router;
