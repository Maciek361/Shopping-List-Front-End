<!-- <template>
  <div><ShoppingList /></div>
</template>
<script>
import ShoppingList from "../components/ShoppingList.vue";

export default {
  components: { ShoppingList },
};
</script>
<style scoped></style> -->

<template>
  <div class="flex">
    <div class="mt-10 ml-10 bg-white card rounded-2xl overflow-auto">
      <div class="mt-8 mx-5 sticky top-0 flex justify-between items-center">
        <router-link to="/">
          <button>
            <Icon icon="mdi:arrow-left" class="w-5 h-5" />
          </button>
        </router-link>
        <p class="text-xs text-slate-400">
          Data utworzenia: {{ formatCreatedAt(shoppingList.created_at) }}
        </p>
        <Icon icon="pepicons-pencil:dots-y" class="w-5 h-5" />
      </div>
      <div class="flex items-center">
        <p class="text-xl mt-8 ml-5">
          {{ shoppingList.name }}
        </p>
      </div>
      <!-- // Poniżej div do wyswietlania produktów -->
      <div>
        <h6 class="text-xs text-slate-400 font-bold mt-8 ml-5">Nabiał</h6>
      </div>
      <hr class="mx-5 mt-2" />
      <ul>
        <li
          class="flex mx-5 my-5 items-center"
          v-for="product in shoppingList.products"
          :key="product.id"
        >
          <label class="flex items-center">
            <input type="checkbox" class="w-6 h-6" />
            <span class="ml-3">{{ product.name }}</span>
          </label>

          <!-- <input
            placeholder="0"
            class="text-xS ml-auto mr-2 block w-7 h-7 border rounded-md text-center"
            type="text"
          /> -->
        </li>
      </ul>
      <hr class="mx-5 mt-2" />
      <select id="select-repo" placeholder="Wybierz produkt" multiple></select>
    </div>
  </div>
  <div class="mt-10">
    {{ shoppingList }}
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { format } from "date-fns";
import TomSelect from "tom-select";
import router from "../router";
const store = useStore();
const props = defineProps(["id"]);
const shoppingList = computed(() =>
  store.getters.getShoppingListById(props.id)
);
const formatCreatedAt = (createdAt) => {
  return format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss");
};
// document.addEventListener("DOMContentLoaded", function () {
onMounted(() => {
  new TomSelect("#select-repo", {
    valueField: "url",
    labelField: "name",
    searchField: "name",
    // fetch remote data
    load: function (query, callback) {
      var url =
        "http://127.0.0.1:8000/api/product?name=" + encodeURIComponent(query);
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          // store.dispatch("addProductToList", productId.value);
          callback(json.items);
        })
        .catch((json) => {
          callback(json.items);
        });
    },
    // custom rendering functions for options and items
    render: {
      option: function (item, escape) {
        return `<div class="py-2 d-flex">
    					<div class="mb-1">
    						<span class="h4">
    							${escape(item.name)}
    						</span>	
    			</div>`;
      },
      item: function (item, escape) {
        return `<div class="py-2 d-flex">
    					<div class="mb-1">
    						<span class="h4">
    							${escape(item.name)}
    						</span>
    					</div>
    			</div>`;
      },
    },
  });
});
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
