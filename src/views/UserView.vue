<template>
  <div>
    <button @click="handleLogout" class="bg-white rounded-lg p-2">
      Logout
    </button>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import router from "../router";

const store = useStore();

const handleLogout = () => {
  store.dispatch("logout").then(() => {
    router.push("login");
  });
};
</script>
<style scoped></style>
