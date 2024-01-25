<template>
  <div class="flex">
    <button @click="onClose" class="ml-auto">
      <Icon icon="ph:x"></Icon>
    </button>
  </div>
  <div class="share-dialog-content flex flex-col gap-6 p-5">
    <p class="text-xl">Współdzielenie listy zakupów</p>
    <input
      v-model="email"
      type="text"
      name="email"
      placeholder="Wpisz adres email uzytkownika"
    />
    <p
      :class="{
        ['text-green-900']: message.success,
        ['text-red-600']: !message.success,
        ['text-bold']: true,
        ['text-center']: true,
        ['text-xl']: true,
      }"
    >
      {{ message.text }}
    </p>
    <div class="flex justify-between">
      <button
        class="bg-green-900 p-2 rounded-lg hover:bg-green-800 text-white"
        @click="confirmShare"
      >
        Potwierdź
      </button>
      <button
        class="bg-slate-300 rounded-lg hover:bg-slate-400 p-2"
        @click="onClose"
      >
        <span class="px-2">Anuluj</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps(["message"]);

const emit = defineEmits(["onConfirm", "onClose"]);

const email = ref("");

const confirmShare = () => {
  emit("onConfirm", { email: email.value });
};

const onClose = () => {
  emit("onClose");
};
</script>
<style scoped></style>
