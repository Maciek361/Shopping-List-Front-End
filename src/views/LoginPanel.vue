<template>
  <div class="m-10 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-xl w-96">
      <h2 class="text-2xl font-semibold mb-4">Zaloguj się</h2>

      <form @submit.prevent="register">
        <div class="mb-4">
          <label
            for="email"
            class="block text-gray-600 text-sm font-medium mb-2"
            >Adres email</label
          >
          <input
            v-model="form.email"
            id="email"
            name="email"
            type="email"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          />
        </div>

        <div class="mb-4 relative">
          <label
            for="password"
            class="block text-gray-600 text-sm font-medium mb-2"
            >Hasło</label
          >
          <div class="flex items-center">
            <input
              v-model="form.password"
              id="password"
              name="password"
              type="password"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-600 pr-10"
            />
            <span
              class="absolute right-0 flex items-center pr-2 cursor-pointer"
              @click="togglePasswordVisibility"
            >
              <Icon v-if="showPassword" icon="ph:eye-light" class="w-5 h-5" />
              <Icon v-else icon="ph:eye-closed-light" class="w-5 h-5" />
            </span>
          </div>
          <div class="mt-2 text-gray-600 text-sm text-left">
            <router-link to="/reset-password" class="text-green-600"
              >Nie pamiętasz hasła?</router-link
            >
          </div>
        </div>
        <router-link to="/home">
          <button
            type="submit"
            class="bg-green-600 text-white px-4 py-2 rounded focus:outline-none hover:bg-green-700 w-full"
          >
            Zaloguj
          </button>
        </router-link>
        <div class="mt-2 text-gray-600 text-sm text-left">
          Nie masz jeszcze konta?
          <router-link to="/register" class="text-green-600"
            >Zarejestruj się</router-link
          >
        </div>
      </form>
    </div>
    <ShoppingListHome v-if="displayHomePage"></ShoppingListHome>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const form = ref({
  username: "",
  email: "",
  password: "",
});

const register = () => {
  console.log("Rejestracja...", form.value);
};
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped></style>
