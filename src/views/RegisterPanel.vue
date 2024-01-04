<template>
  <div class="m-10 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-96">
      <h2 class="text-2xl font-semibold mb-4">Zarejestruj się</h2>

      <form @submit.prevent="register">
        <div class="mb-4">
          <label
            for="username"
            class="block text-gray-600 text-sm font-medium mb-2"
            >Imię i Nazwisko</label
          >
          <input
            v-model="form.username"
            id="username"
            name="username"
            type="text"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          />
        </div>

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
        </div>
        <div class="mb-4 relative">
          <label
            for="password"
            class="block text-gray-600 text-sm font-medium mb-2"
            >Powtórz Hasło</label
          >
          <div class="flex items-center">
            <input
              v-model="form.repeatPassword"
              id="repeat-password"
              name="repeat-password"
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
        </div>
        <router-link to="/home">
          <button
            type="submit"
            class="bg-green-600 text-white px-4 py-2 rounded focus:outline-none hover:bg-green-700 w-full"
          >
            Zarejestruj się
          </button>
        </router-link>
      </form>

      <div class="mt-4 text-gray-600 text-sm text-center">
        Masz już konto?
        <router-link to="/login" class="text-green-600"
          >Zaloguj się</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const showPassword = ref(false);

const form = ref({
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const register = () => {
  console.log("Rejestracja...", form.value);
};
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
/* Dodaj tutaj dodatkowe style Tailwind CSS według potrzeb */
</style>
