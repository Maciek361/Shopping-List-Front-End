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
      <form @submit.prevent="createList">
        <div class="flex items-center">
          <input
            v-model="form.name"
            id="name"
            name="name"
            placeholder="Podaj nazwę listy"
            maxlength="30"
            type="text"
            class="text-xl mt-8 ml-5 border-b border-green-700 outline-none"
          />
          <button>
            <Icon icon="material-symbols:edit" class="mt-8 ml-2" />
          </button>
        </div>
        <!-- <input
          v-model="formProduct.product_id"
          id="productName"
          name="productName"
          placeholder="Dodaj produkt"
          maxlength="30"
          type="text"
          class="text-xl mt-8 ml-5 border-b border-green-700 outline-none"
        />
        <button
          @click="AddNewProduct"
          class="my-8 bg-green-700 h-10 w-10 flex justify-center items-center rounded-3xl text-white"
        >
          <Icon icon="fluent-mdl2:accept-medium" class="w-5 h-5" />
        </button> -->
      </form>

      <!-- // Poniżej div do wyswietlania produktów -->
      <!-- <div>
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
      </ul> -->
      <!-- //dodawanie listy do bazy -->
      <div class="flex justify-around mx-20">
        <button
          @click="createShoppingList"
          class="my-8 bg-green-700 h-16 w-16 flex justify-center items-center rounded-3xl text-white"
        >
          <Icon icon="fluent-mdl2:accept-medium" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useStore } from "vuex";
import router from "../router";

const store = useStore();

const hideList = ref(false);

const form = ref({
  name: "",
});

const createShoppingList = () => {
  store.dispatch("createNewList", form.value).then(() => {
    router.push("/");
  });
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
