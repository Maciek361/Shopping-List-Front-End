<template>
  <div class="shopping-list-view">
    <div
      class="shopping-list-view-content-header flex flex-col bg-green-900 p-2"
    >
      <div class="header-top flex justify-center items-center my-4">
        <h1 class="text-xl text-white">Listy zakupowe</h1>
      </div>
      <!-- <p class="text-xs text-slate-400 text-center">
        Data utworzenia: {{ formatCreatedAt(shoppingList.created_at) }}
      </p> -->
    </div>
    <div class="shopping-list-view-content p-2 bg-white rounded-xl">
      <h6 class="text-slate-600 text-lg font-bold py-5 ml-4">
        Utworzone listy
      </h6>
      <hr class="mx-2 mb-3" />

      <div class="flex">
        <div
          v-if="!shoppingLists.length"
          class="no-lists text-lg font-bold pt-7 ml-4"
        >
          Brak utworzonych list!
        </div>
        <ul v-else>
          <li
            class="flex mx-3 items-center text-white p-3 mb-3 card rounded-lg shadow-md"
            :style="{ backgroundColor: getColorForList(item.id) }"
            v-for="item in shoppingLists"
            :key="item.id"
            @click="() => openShoppingList(item.id)"
          >
            <div class="rounded-full"></div>
            <div class="items-center ml-3">
              <p class="font-bold">{{ item.name }}</p>
              <p class="text-xs text-white">
                Utworzono: {{ formatCreatedAt(item.created_at) }}
              </p>
            </div>

            <!-- <button >
              <Icon icon="mdi:chevron-right" class="w-5 h-5" />
            </button> -->
            <span class="ml-auto mr-2 block">
              {{ checkedProductsCount(item) }}/{{
                item.quantities.length
              }}</span
            >
          </li>
        </ul>
        <ShoppingListView
          v-if="selectedList != null"
          :id="selectedList"
        ></ShoppingListView>
      </div>
    </div>

    <div class="shopping-list-view-bottom bg-green-900">
      <div class="flex justify-around my-4 rounded-t-xl py-4">
        <button>
          <Icon
            class="text-2xl"
            color="white"
            icon="material-symbols:search"
          ></Icon>
        </button>
        <button @click="showCreateListModal">
          <Icon color="white" class="text-2xl" icon="lucide:plus"></Icon>
        </button>
        <button @click="router.push('user')">
          <Icon color="white" class="text-2xl" icon="clarity:user-line"></Icon>
        </button>
      </div>
    </div>
  </div>
  <dialog ref="dialogRef">
    <CreateListDialogContent
      @on-confirm="(v) => confirmCreate(v)"
      @on-close="confirmCreate"
    />
  </dialog>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import router from "../router";
import { format } from "date-fns";
import CreateListDialogContent from "../components/CreateListDialog/CreateListDialogContent.vue";

import ShoppingListView from "../views/ShoppingListView.vue";
const store = useStore();
const dialogRef = ref(null);

const shoppingLists = computed(() => store.getters.getShoppingLists);
const userId = computed(() => store.getters.getUserId);

onMounted(() => {
  store.dispatch("userListFetch", userId.value);
});

const openShoppingList = (listId) => {
  const screenWidth = window.innerWidth;

  const thresholdWidth = 600;

  if (screenWidth < thresholdWidth) {
    router.push({ name: "showShoppingList", params: { id: listId } });
  } else {
    selectedList.value = listId;
    console.log("Id w które kliknąłem", selectedList.value);
  }
};

const confirmCreate = ({ name }) => {
  store.dispatch("createNewList", { name }).then(() => {
    store.dispatch("userListFetch", userId.value);
    dialogRef.value.close();
  });
};
const selectedList = ref(null);
const showCreateListModal = () => {
  dialogRef.value.showModal();
};
function getColorForList(listId) {
  const colors = ["#16a34a", "#15803d", "#166534", "#14532d"];
  const colorIndex = (listId - 1) % colors.length;
  return colors[colorIndex];
}

const checkedProductsCount = (item) => {
  return item.quantities
    ? item.quantities.filter((quantity) => quantity.checked === 1).length
    : 0;
};
const formatCreatedAt = (createdAt) => {
  return format(new Date(createdAt), "dd-MM-yyyy");
};
</script>
<style>
.card {
  /* height: 100%;
    min-width: 328px; */
  width: 380px;
  height: 800;
  background: #f8f8f8;
  transform: scale(1);
  transition: all 0.3s ease-in-out;
}
.card:hover {
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}
.btn-size {
  width: 320px;
}
</style>
