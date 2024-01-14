<template>
  <div class="shopping-list-view">
    <div class="shopping-list-view-content-header flex flex-col bg-green-600">
      <router-link class="pt-2 pl-2" to="/">
        <button>
          <Icon icon="mdi:arrow-left" color="white" class="w-5 h-5" />
        </button>
      </router-link>
      <div class="header-top flex justify-around items-center mb-3">
        <p class="text-xl font-bold text-white">{{ shoppingList.name }}</p>
      </div>
      <p class="text-xs text-slate-200 text-center mb-1">
        Data utworzenia: {{ formatCreatedAt(shoppingList.created_at) }}
      </p>
    </div>
    <div class="shopping-list-view-content bg-white p-2 rounded-t-xl">
      <div class="add-to-list-wrapper flex gap-2">
        <MTomSelect class="flex-1" @on-change="(v) => onChange(v)" />
        <button
          @click="addToList()"
          class="bg-green-600 rounded-lg text-white p-2"
        >
          <Icon icon="fluent-mdl2:accept-medium" class="w-5 h-5" />
        </button>
      </div>
      <div class="bg-white rounded-b-xl">
        <ul v-for="category in shoppingList.categories" :key="category.id">
          <h6 class="text-sm text-slate-500 font-bold mt-8 ml-5">
            {{ category.category_name }}
          </h6>

          <li
            class="flex mx-5 my-2 items-center"
            v-for="product in category.products"
            :key="product.id"
          >
            <label class="flex items-center">
              <input
                type="checkbox"
                class="w-5 h-5"
                :checked="product.checked"
                @change="
                  (e) => updateCheckedForProduct(product, e.target.checked)
                "
              />
              <span class="ml-3">{{ product.name }}</span>
            </label>
            <input
              placeholder="x"
              class="text-sm ml-auto mr-2 block w-6 h-6 border rounded-md text-center"
              type="text"
              maxlength="2"
              :value="product.quantity"
              @change="(value) => updateQuantity(product, value)"
            />
            <!-- @change="updateQuantity(product.quantity, product.id)" -->
            <button @click="removeProductFromList(product.id)">
              <Icon icon="bi:trash-fill" color="grey"></Icon>
            </button>
          </li>
          <hr class="mx-2" />
        </ul>
      </div>
    </div>
    <div class="shopping-list-view-bottom rounded-xl">
      <div class="flex justify-around my-4 py-4">
        <button>
          <Icon
            class="text-2xl"
            color="white"
            icon="material-symbols:share-outline"
          ></Icon>
        </button>
        <button>
          <router-link to="/">
            <Icon color="white" class="text-2xl" icon="tabler:home"></Icon>
          </router-link>
        </button>
        <button @click="removeUserFromList">
          <Icon icon="bi:trash" color="white" class="text-2xl"></Icon>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { format } from "date-fns";
import {
  attachProductToList,
  detachProductFromList,
  detachUserFromList,
  updateProductQuantity,
  updateChecked,
} from "../api/api";
import MTomSelect from "../components/TomSelect/MTomSelect.vue";
import router from "../router";

const store = useStore();
const props = defineProps(["id"]);
const userId = computed(() => store.getters.getUserId);

const shoppingList = computed(() =>
  store.getters.getShoppingListById(props.id)
);
const productId = ref(null);

const onChange = ({ value }) => {
  productId.value = value;
};

const addToList = async () => {
  const response = await attachProductToList(props.id, productId.value);
  // TODO show toast/modal (Produkt zostal dodany etc) (use response)
  store.dispatch("showListById", props.id);
};

const updateQuantity = async ({ id }, event) => {
  const quantity = event.target.value;

  const response = await updateProductQuantity(props.id, id, quantity);
  store.dispatch("showListById", props.id);
};

const removeProductFromList = async (id) => {
  const response = await detachProductFromList(props.id, id);
  store.dispatch("showListById", props.id);
};

const removeUserFromList = async () => {
  const response = await detachUserFromList(props.id, userId.value);

  store.dispatch("showListById", props.id);

  router.push("/");
};

const updateCheckedForProduct = async ({ id }, checked) => {
  const response = await updateChecked(props.id, id, checked);

  store.dispatch("showListById", props.id);

  console.log(shoppingList.value);
};

const formatCreatedAt = (createdAt) => {
  return format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss");
};
</script>
<style>
body {
  background-color: rgb(22 163 74);
}
.card {
  width: 380px;
  height: 800;
}
</style>
