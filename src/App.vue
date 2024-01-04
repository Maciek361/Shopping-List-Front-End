<template>
  <div id="app">
    <router-link to="/login"></router-link>
    <router-link to="/register"></router-link>
    <router-link to="/home"></router-link>
    <router-link to="/createShoppingList"></router-link>
    <router-view />
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from "vue-router";

import "./assets/tailwind.css";
</script>

<style scoped></style>
