<template>
  <div>list id {{ id }}</div>
  <div>
    {{ shoppingList }}
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps(["id"]);
const store = useStore();

const shoppingList = computed(() =>
  store.getters.getShoppingListById(props.id)
);
</script>
<style scoped></style>
