<template>
  <div class="share-dialog-content flex flex-col gap-6 p-5">
    <p class="text-xl">Utwórz nową listę</p>
    <input
      class="py-2"
      v-model="name"
      type="text"
      name="name"
      maxlength="30"
      placeholder="Podaj nazwę listy"
    />
    <!-- <p
      :class="{
        ['text-lime-500']: message.success,
        ['text-red-600']: !message.success,
        ['text-bold']: true,
        ['text-center']: true,
        ['text-xl']: true,
      }"
    >
      {{ message.text }}
    </p> -->
    <div class="flex justify-between">
      <button
        class="bg-green-600 p-2 rounded text-white"
        @click="confirmCreate"
      >
        Potwierdz
      </button>
      <button @click="onClose">Anuluj</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps(["message"]);

const emit = defineEmits(["onConfirm", "onClose"]);

const name = ref("");

const confirmCreate = () => {
  emit("onConfirm", { name: name.value });
};

const onClose = () => {
  emit("onClose");
};
</script>
<style scoped></style>
