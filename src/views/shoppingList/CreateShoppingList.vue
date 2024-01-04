<template>
  <div class="flex">
    <div
      class="mt-10 ml-10 bg-white card rounded-2xl overflow-auto"
      v-if="!hideList"
    >
      <div class="mt-8 mx-5 sticky top-0 flex justify-between items-center">
        <button>
          <Icon icon="mdi:arrow-left" class="w-5 h-5" />
        </button>
        <p class="text-xs text-slate-400">Data utworzenia: 25.06.2020</p>
        <button @click="hideList = !hideList">
          <Icon icon="ph:x" class="w-5 h-5" />
        </button>
      </div>
      <div class="flex items-center mx-5">
        <input
          type="text"
          class="text-xl mt-8 w-full border-b border-green-700 outline-none"
          placeholder="Podaj nazwę listy"
          maxlength="30"
        />
        <button>
          <Icon icon="material-symbols:edit" class="mt-8 ml-2" />
        </button>
      </div>
      <div class="mx-5 flex items-center relative">
        <span class="absolute left-0 flex items-center">
          <Icon icon="quill:search" class="mt-8" />
        </span>
        <input
          type="text"
          class="text-md mt-8 w-full border-b pl-5 border-green-700 outline-none"
          placeholder="Szukaj produktów"
          maxlength="30"
        />
        <button class="">
          <Icon icon="basil:add-solid" class="mt-8 ml-2 w-8 h-8" />
        </button>
      </div>
      <div>
        <h6 class="text-xs text-slate-400 font-bold mt-8 ml-5">Nabiał</h6>
      </div>
      <hr class="mx-5 mt-2" />
      <ul>
        <li
          class="flex mx-5 my-5 items-center"
          v-for="(item, key, index) in diary"
        >
          <label class="flex items-center">
            <div class="w-10 h-10 bg-red-100 rounded-full"></div>

            <span class="ml-3">{{ item }}</span>
          </label>

          <input
            placeholder="0"
            class="text-xS ml-auto mr-2 block w-7 h-7 border rounded-md text-center"
            type="text"
          />
        </li>
      </ul>
      <hr class="mx-5 mb-5" />

      <div class="flex justify-center mx-20">
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded-xl focus:outline-none hover:bg-green-700 w-full"
        >
          Zapisz listę
        </button>
      </div>
    </div>
    <AddProduct v-if="displayAddProduct"></AddProduct>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref, reactive } from "vue";
import AddProduct from "./AddProduct.vue";
const hideList = ref(false);
const displayAddProduct = ref(false);
const diary = reactive({
  item1: "Mleko",
  item2: "Ser",
  item3: "Jogurt Naturalny",
});
const bakery = reactive({
  item1: "Chleb",
  item2: "Bułki",
  item3: "Bagietka",
});
const coldCuts = reactive({
  item1: "Szynka",
  item2: "Salami",
  item3: "Prosciutto Cotto",
});
const frozenStuff = reactive({});
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
