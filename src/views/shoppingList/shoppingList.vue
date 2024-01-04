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
      <div class="flex items-center">
        <input
          type="text"
          class="text-xl mt-8 ml-5 border-b border-green-700 outline-none"
          placeholder="Podaj nazwę listy"
          maxlength="20"
        />
        <button>
          <Icon icon="material-symbols:edit" class="mt-8 ml-2" />
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
            <input type="checkbox" class="w-6 h-6" />
            <span class="ml-3">{{ item }}</span>
          </label>

          <input
            placeholder="0"
            class="text-xS ml-auto mr-2 block w-7 h-7 border rounded-md text-center"
            type="text"
          />
        </li>
      </ul>
      <div>
        <h6 class="text-xs text-slate-400 font-bold mt-8 ml-5">Pieczywo</h6>
      </div>
      <hr class="mx-5 mt-2" />

      <ul class="">
        <li
          class="flex mx-5 my-5 items-center"
          v-for="(item, key, index) in bakery"
        >
          <label class="flex items-center">
            <input type="checkbox" class="w-6 h-6" />
            <span class="ml-3">{{ item }}</span>
          </label>

          <input
            placeholder="0"
            class="text-xS ml-auto mr-2 block w-7 h-7 border rounded-md text-center"
            type="text"
          />
        </li>
      </ul>
      <div>
        <h6 class="text-xs text-slate-400 font-bold mt-8 ml-5">Wędliny</h6>
      </div>
      <hr class="mx-5 mt-2" />

      <ul class="">
        <li
          class="flex mx-5 my-5 items-center"
          v-for="(item, key, index) in coldCuts"
        >
          <label class="flex items-center">
            <input type="checkbox" class="w-6 h-6" />
            <span class="ml-3">{{ item }}</span>
          </label>

          <input
            placeholder="0"
            class="text-xS ml-auto mr-2 block w-7 h-7 border rounded-md text-center"
            type="text"
          />
        </li>
      </ul>
      <div class="flex justify-around mx-20">
        <button
          @click="displayAddProduct = !displayAddProduct"
          class="my-8 bg-green-700 h-16 w-16 flex justify-center items-center rounded-3xl text-white"
        >
          <Icon icon="ic:baseline-plus" class="w-7 h-7" />
        </button>
        <button
          @click="click"
          class="my-8 bg-green-700 h-16 w-16 flex justify-center items-center rounded-3xl text-white"
        >
          <Icon icon="fluent-mdl2:accept-medium" class="w-5 h-5" />
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
