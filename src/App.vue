<template>
  <!-- <RouterView /> -->
  <div class="flex">
    <!-- <ShoppingListHome></ShoppingListHome> -->
    <RegistrationPanel></RegistrationPanel>
    <LoginPanel></LoginPanel>
    <!-- <ShoppingList></ShoppingList> -->
    <!-- <AddProduct></AddProduct> -->
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from "vue-router";
import ShoppingListHome from "./components/shoppingList/ShoppingListHome.vue";
import RegistrationPanel from "./components/shoppingList/RegistrationPanel.vue";
import LoginPanel from "./components/shoppingList/LoginPanel.vue";
import ShoppingList from "./components/shoppingList/shoppingList.vue";
import AddProduct from "./components/shoppingList/AddProduct.vue";
import "./assets/tailwind.css";
</script>

<style scoped></style>
