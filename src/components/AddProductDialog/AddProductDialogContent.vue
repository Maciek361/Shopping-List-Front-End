<template>
  <div class="flex">
    <button @click="onClose" class="ml-auto">
      <Icon icon="ph:x"></Icon>
    </button>
  </div>
  <div class="flex flex-col p-5 gap-y-5">
    <p class="text-xl">Dodaj produkt do bazy danych</p>
    <input
      class="py-2"
      v-model="name"
      type="text"
      name="name"
      maxlength="25"
      placeholder="Podaj nazwę produktu"
    />
    <div class="flex">
      <button @click="addProduct" class="bg-slate-300 p-2 rounded-lg ml-auto">
        Dodaj produkt
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";

const store = useStore();

const props = defineProps(["message"]);
const name = ref("");

const emit = defineEmits(["onConfirm", "onClose"]);

const addProduct = () => {
  emit("onConfirm", {});
};
const onClose = () => {
  emit("onClose");
};
</script>
<style scoped></style>
