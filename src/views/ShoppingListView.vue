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
      <select
        id="select-repo"
        class="w-full"
        placeholder="Wybierz produkt"
      ></select>
      <button
        @click="addToList(productId)"
        class="bg-green-700 rounded-3xl text-white"
      >
        <Icon icon="fluent-mdl2:accept-medium" class="w-5 h-5" />
      </button>

      <div>
        <h6 class="text-xs text-slate-400 font-bold mt-8 ml-5">Nabiał</h6>
      </div>
      <hr class="mx-5 mt-2" />
      <ul>
        <li
          class="flex mx-5 my-3 items-center"
          v-for="product in shoppingList.products"
          :key="product.id"
        >
          <label class="flex items-center">
            <input
              type="checkbox"
              class="w-5 h-5"
              :checked="isChecked(product.id)"
            />
            <span class="ml-3">{{ product.name }}</span>
          </label>

          <input
            placeholder="x"
            class="text-sm ml-auto mr-2 block w-6 h-6 border rounded-md text-center"
            type="text"
            maxlength="2"
            :value="getQuantity(product.id)"
          />
        </li>
      </ul>
      <hr class="mx-5 mt-2" />
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
import { attachProductToList } from "../api/api";
import router from "../router";

const store = useStore();
const props = defineProps(["id"]);
const userId = computed(() => store.getters.getUserId);

const shoppingList = computed(() =>
  store.getters.getShoppingListById(props.id)
);
const productId = ref(null);
const onChange = (value) => {
  productId.value = value;
};
const addToList = async () => {
  const response = await attachProductToList(props.id, productId.value);
  console.log("productId", productId.value);
  store.dispatch("userListFetch", userId.value);
};

const isChecked = (productId) => {
  const isCheckedObj = shoppingList.value.quantities.find(
    (q) => q.product_id === productId
  );
  return isCheckedObj ? isCheckedObj.checked === 1 : false;
};
const getQuantity = (productId) => {
  const quantityObj = shoppingList.value.quantities.find(
    (q) => q.product_id === productId
  );
  return quantityObj ? quantityObj.quantity : 0;
};
const formatCreatedAt = (createdAt) => {
  return format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss");
};

onMounted(() => {
  new TomSelect("#select-repo", {
    onChange: (value) => onChange(value),
    valueField: "id",
    labelField: "name",
    searchField: "name",
    load: function (query, callback) {
      var url =
        "http://127.0.0.1:8000/api/product?name=" + encodeURIComponent(query);
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          callback(json);
          console.log("json", json);
        })
        .catch((json) => {
          callback(json);
        });
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
