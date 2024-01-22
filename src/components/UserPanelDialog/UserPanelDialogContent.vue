<template>
  <div class="flex">
    <button @click="onClose" class="ml-auto">
      <Icon icon="ph:x"></Icon>
    </button>
  </div>
  <div v-if="userData" class="flex flex-col p-5 gap-y-5">
    <p class="text-xl">Dane użytkownika</p>

    <div class="flex">
      <p class="font-bold text-slate-800">Imię i Nazwisko:</p>
      <span class="ml-2"> {{ userData.name }}</span>
    </div>
    <div class="flex">
      <p class="font-bold text-slate-800">Email:</p>
      <span class="ml-2"> {{ userData.email }}</span>
    </div>

    <div class="flex">
      <button @click="logOutUser" class="bg-slate-300 p-2 rounded-lg ml-auto">
        Wyloguj
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";

const store = useStore();
const userData = computed(() => store.getters.getUserData);

const props = defineProps(["message"]);

const emit = defineEmits(["onConfirm", "onClose"]);

const logOutUser = () => {
  emit("onConfirm", {});
};
console.log("user", userData);
const onClose = () => {
  emit("onClose");
};
</script>
<style scoped></style>
