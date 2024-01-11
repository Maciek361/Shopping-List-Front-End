<template>
  <div class="flex">
    <div class="mt-10 ml-10 bg-white card rounded-2xl overflow-auto">
      <div class="mt-8 mx-5 sticky top-0 flex justify-between items-center">
        <button>
          <Icon icon="mdi:arrow-left" class="w-5 h-5" />
        </button>

        <p class="text-xs text-slate-400">Data utworzenia: 25.06.2020</p>
        <Icon icon="pepicons-pencil:dots-y" class="w-5 h-5" />
      </div>
      <div class="flex items-center">
        <p class="text-xl mt-8 ml-5 border-b border-green-700 outline-none">
          Nazwa Listyasdasd
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

          <input
            placeholder="0"
            class="text-xS ml-auto mr-2 block w-7 h-7 border rounded-md text-center"
            type="text"
          />
        </li>
      </ul>
      <hr class="mx-5 mt-2" />
      <div class="flex justify-around mx-20">Coś tu jest</div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import router from "../router";
const store = useStore();
const props = defineProps(["id"]);
const shoppingList = computed(() =>
  store.getters.getShoppingListById(props.id)
);
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
