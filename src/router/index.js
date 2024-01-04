import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ShoppingListHome from "../views/shoppingList/ShoppingListHome.vue";
import CreateShoppingList from "../views/shoppingList/CreateShoppingList.vue";
import RegisterPanel from "../views/RegisterPanel.vue"; // Dostosuj ścieżkę do rzeczywistego położenia pliku
import LoginPanel from "../views/LoginPanel.vue"; // Dostosuj ścieżkę do rzeczywistego położenia pliku

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/login", component: LoginPanel },
    { path: "/", redirect: "/login" },
    { path: "/register", component: RegisterPanel },
    {
      path: "/home",
      component: ShoppingListHome,
    },
    {
      path: "/createShoppingList",
      component: CreateShoppingList,
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
