<template>
  <div class="flex">
    <div class="mt-10 ml-10 card rounded-2xl overflow-auto bg-green-600">
      <!-- <div class="flex justify-end m-3">
        <div
          class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
        >
          <span class="text-sm"> ID:{{ userId }}</span>
        </div>
      </div> -->
      <div class="flex my-8 items-center justify-center">
        <h1 class="text-xl text-white">Listy zakupowe</h1>
      </div>

      <div class="bg-white rounded-xl py-3">
        <h6 class="text-slate-600 text-xs font-bold py-5 ml-4">
          Utworzone listy
        </h6>
        <div>
          <div
            v-if="!shoppingLists.length"
            class="no-lists text-xs font-bold pt-7 ml-4"
          >
            Brak utworzonych list!
          </div>
          <ul v-else>
            <li
              class="flex mx-3 items-center p-2 mb-3 rounded-lg shadow-md hover:bg-green-600 hover:text-white"
              v-for="item in shoppingLists"
              :key="item.id"
              @click="() => openShoppingList(item.id)"
            >
              <div class="w-10 h-10 bg-blue-300 rounded-full"></div>
              <div class="items-center ml-3">
                <p class="">{{ item.name }}</p>
                <p class="text-sm">produktów</p>
              </div>

              <button class="ml-auto mr-2 block">
                <Icon icon="mdi:chevron-right" class="w-5 h-5" />
              </button>
            </li>
          </ul>
        </div>
        <div v-if="showModal" class="absolute bottom-80 ml-3">
          <div class="bg-white p-4 rounded shadow-xl">
            <form>
              <input
                v-model="form.name"
                id="name"
                name="name"
                class="border p-2 w-full"
                placeholder="Podaj nazwę listy"
                maxlength="30"
              />
              <button
                @click="createShoppingList"
                class="bg-green-700 text-white"
              >
                <Icon icon="fluent-mdl2:accept-medium" class="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        class="flex justify-around sticky bottom-0 bg-green-600 my-4 rounded-t-xl py-4"
      >
        <!-- <router-link to="/shopping">
          <button
            class="text-white h-16 flex justify-center items-center mt-14 rounded-3xl bg-green-700 btn-size"
          >
            Stwórz nową listę
          </button>
        </router-link> -->
        <button>
          <Icon class="text-2xl" color="white" icon="codicon:home"></Icon>
        </button>
        <button @click="openModal">
          <Icon color="white" class="text-2xl" icon="lucide:plus"></Icon>
        </button>
        <button>
          <Icon color="white" class="text-2xl" icon="clarity:user-line"></Icon>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import router from "../router";

const store = useStore();

const shoppingLists = computed(() => store.getters.getShoppingLists);
const userId = computed(() => store.getters.getUserId);

onMounted(() => {
  store.dispatch("userListFetch", userId.value);
});
const form = ref({
  name: "",
});

const createShoppingList = () => {
  store.dispatch("createNewList", form.value).then(() => {
    router.push("/");
  });
};
const openShoppingList = (listId) => {
  router.push({ path: `/shopping/${listId}`, params: { listId } });
};
const showModal = ref(false);
const openModal = () => {
  showModal.value = true;
};
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
