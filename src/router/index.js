import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import AddShoppingListView from "../views/AddShoppingListView.vue";

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
      beforeEnter: () => isUserAuthenticated(),
    },
  ],
});

const isUserAuthenticated = () => {
  const user = router.store.state.user;

  return user !== null ? true : "login";
};

export default router;
