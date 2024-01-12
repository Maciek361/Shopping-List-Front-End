<template>
  <div class="shopping-list-view">
    <div class="shopping-list-view-content-header flex flex-col bg-white p-2">
      <div class="header-top flex justify-between items-center mb-2">
        <router-link class="flex items-center" to="/">
          <button>
            <Icon icon="mdi:arrow-left" class="w-5 h-5" />
          </button>
        </router-link>
        <p class="text-lg font-bold">{{ shoppingList.name }}</p>
        <button>
          <Icon icon="pepicons-pencil:dots-y" class="w-5 h-5" />
        </button>
      </div>
      <p class="text-xs text-slate-400 text-center">
        Data utworzenia: {{ formatCreatedAt(shoppingList.created_at) }}
      </p>
    </div>
    <div class="shopping-list-view-content p-2">
      <div class="add-to-list-wrapper flex gap-4">
        <MTomSelect class="flex-1" @on-change="(v) => onChange(v)" />
        <button
          @click="addToList(productId)"
          class="bg-green-700 text-white p-2"
        >
          <Icon icon="fluent-mdl2:accept-medium" class="w-5 h-5" />
        </button>
      </div>
      <div>LOOP THRU CATEGORIES (still named as shoppingList) below</div>
    </div>
    <div class="shopping-list-view-bottom"></div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { format } from "date-fns";
import { attachProductToList } from "../api/api";
import MTomSelect from "../components/TomSelect/MTomSelect.vue";

const store = useStore();
const props = defineProps(["id"]);

const shoppingList = computed(() =>
  store.getters.getShoppingListById(props.id)
);
const productId = ref(null);

console.log(shoppingList.value);

const onChange = ({ value }) => {
  productId.value = value;
};

const addToList = async () => {
  const response = await attachProductToList(props.id, productId.value);
  // TODO show toast/modal (Produkt zostal dodany etc) (use response)
  store.dispatch("showListById", props.id);
};

const formatCreatedAt = (createdAt) => {
  return format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss");
};
</script>
<style>
body {
  background-color: antiquewhite;
}
.card {
  width: 380px;
  height: 800;
}
</style>
