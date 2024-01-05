<template>
  <div class="mt-10 ml-10 bg-white add-cart rounded-2xl">
    <div class="flex mt-8 mx-3 justify-between items-center">
      <h1 class="text-xl">Dodaj produkt</h1>
      <button>
        <Icon icon="ph:x" class="w-5 h-5" />
      </button>
    </div>
    <hr class="mx-3 mt-2" />
    <div class="grid grid-cols-3">
      <div class="col-span-3 mt-5 mx-3">
        <input
          type="text"
          placeholder="Nazwa produktu"
          class="border rounded w-full border-black pl-2 outline-none"
          maxlength="20"
        />
      </div>
      <div class="mt-5 ml-3" v-for="item in productsType">
        <label class="flex items-center">
          <input type="radio" class="mr-2 w-4 h-4" name="radio-btn" />
          <span>{{ item }}</span>
        </label>
      </div>
    </div>
    <div class="flex justify-center mx-16 mt-8">
      <button
        class="bg-green-700 h-10 w-full flex justify-center items-center rounded-3xl text-white"
      >
        Zatwierdź
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { Icon } from "@iconify/vue";

const productsType = reactive({
  item4: "Mięso",
  item8: "Mrożonki",
  item1: "Nabiał",
  item9: "Napoje",
  item7: "Owoce",
  item2: "Pieczywo",
  item10: "Przetwory",
  item5: "Sypkie",
  item6: "Warzywa",
  item3: "Wędliny",
  item11: "Inne",
});
</script>
<style>
.add-cart {
  width: 350px;
  height: auto;
}
</style>
