<template>
  <div class="flex">
    <div class="mt-10 ml-10 bg-white card rounded-2xl overflow-auto">
      <div class="flex justify-center mt-12">
        <h1 class="text-xl">Lista zakupów</h1>
      </div>
      <h6 class="text-slate-400 text-xs font-bold pt-7 ml-4">
        Najczęściej używane
      </h6>
      <ul>
        <li class="flex mx-3 mt-5 items-center">
          <div class="w-10 h-10 bg-red-100 rounded-full"></div>
          <div class="items-center ml-3">
            <p class="">Najczęściej kupowane</p>
            <p class="text-sm text-slate-400">10 produktów</p>
          </div>
          <button class="ml-auto mr-2 block">
            <Icon icon="mdi:chevron-right" class="w-5 h-5" />
          </button>
        </li>
      </ul>

      <div class="">
        <h6 class="text-slate-400 text-xs font-bold pt-7 ml-4">
          Utworzone listy
        </h6>
        <ul>
          <li class="flex mx-3 mt-5 items-center" v-for="item in productGroup">
            <div class="w-10 h-10 bg-red-100 rounded-full"></div>
            <div class="items-center ml-3">
              <p class="">{{ item.groupName }}</p>
              <p class="text-sm text-slate-400">
                {{ item.productsQuantity }} produktów
              </p>
            </div>
            <button class="ml-auto mr-2 block">
              <Icon icon="mdi:chevron-right" class="w-5 h-5" />
            </button>
          </li>
        </ul>
      </div>
      <div class="flex justify-center">
        <button
          @click="displayList = !displayList"
          class="text-white h-16 flex justify-center items-center mt-14 rounded-3xl bg-green-700 btn-size"
        >
          Stwórz nową listę
        </button>
      </div>
    </div>
    <ShoppingList v-if="displayList"></ShoppingList>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import ShoppingList from "./shoppingList.vue";

const displayList = ref(false);

const productGroup = ref([
  {
    img: "",
    groupName: "Pizza",
    productsQuantity: "5",
  },
  {
    img: "",
    groupName: "Burgery",
    productsQuantity: "7",
  },
  {
    img: "",
    groupName: "Ramen",
    productsQuantity: "6",
  },
  {
    img: "",
    groupName: "Carbonara",
    productsQuantity: "5",
  },
  {
    img: "",
    groupName: "Tortilla",
    productsQuantity: "6",
  },
]);
</script>
<style>
body {
  background-color: antiquewhite;
}
.card {
  width: 380px;
  height: 720px;
}
.btn-size {
  width: 320px;
}
</style>
