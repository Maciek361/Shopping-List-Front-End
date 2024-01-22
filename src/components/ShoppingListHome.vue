<template>
  <div class="shopping-list-view background-home">
    <div
      class="shopping-list-view-content-header flex flex-col bg-green-900 p-2"
    >
      <div class="header-top flex justify-center items-center my-4">
        <h1 class="text-xl text-white">Listy zakupowe</h1>
      </div>
    </div>
    <div class="shopping-list-view-content p-2">
      <h6 class="text-lg font-bold py-2 ml-4">Utworzone listy</h6>

      <div class="md:flex">
        <div
          v-if="!shoppingLists.length"
          class="no-lists text-lg font-bold pt-7 ml-4"
        >
          Brak utworzonych list!
        </div>
        <ul v-else class="mt-2">
          <div class="card-container">
            <li
              class="flex mx-3 items-center text-white p-3 mb-3 card rounded-lg shadow-md"
              :style="{ backgroundColor: getColorForList(item.id) }"
              v-for="item in shoppingLists"
              :key="item.id"
              @click="() => openShoppingList(item.id)"
            >
              <div class="items-center ml-3">
                <p class="font-bold">{{ item.name }}</p>
                <p class="text-xs text-white">
                  Utworzono: {{ formatCreatedAt(item.created_at) }}
                </p>
              </div>

              <span class="ml-auto mr-2 block">
                {{ checkedProductsCount(item) }}/{{
                  item.quantities.length
                }}</span
              >
            </li>
          </div>
        </ul>
        <div class="flex justify-center">
          <ShoppingListView
            class=""
            v-if="selectedList != null"
            :id="selectedList"
          ></ShoppingListView>
        </div>
      </div>
    </div>
    <div class="shopping-list-view-bottom bg-green-900 fixed bottom-0 w-full">
      <div class="flex justify-around rounded-t-xl py-2">
        <button @click="showCreateListModal">
          <Icon color="white" class="text-2xl" icon="lucide:plus"></Icon>
        </button>
        <!-- <button @click="router.push('user')">
          <Icon color="white" class="text-2xl" icon="clarity:user-line"></Icon>
        </button> -->
        <button @click="showUserPanelModal">
          <Icon color="white" class="text-2xl" icon="clarity:user-line"></Icon>
        </button>
      </div>
    </div>
  </div>
  <dialog class="rounded-xl" ref="dialogRef">
    <CreateListDialogContent
      @on-confirm="(v) => confirmCreate(v)"
      @on-close="CreateListClose"
    />
  </dialog>
  <dialog class="rounded-xl" ref="userDialogRef">
    <UserPanelDialogContent
      @on-confirm="handleLogout"
      @on-close="closeUserPanelModal"
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
import UserPanelDialogContent from "../components/UserPanelDialog/UserPanelDialogContent.vue";

import ShoppingListView from "../views/ShoppingListView.vue";
const store = useStore();
const dialogRef = ref(null);
const userDialogRef = ref(null);
const shoppingLists = computed(() => store.getters.getShoppingLists);
const userId = computed(() => store.getters.getUserId);

onMounted(() => {
  store.dispatch("userListFetch", userId.value);
});

const openShoppingList = (listId) => {
  const screenWidth = window.innerWidth;

  const thresholdWidth = 700;

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
const showUserPanelModal = () => {
  userDialogRef.value.showModal();
};
const CreateListClose = () => {
  dialogRef.value.close();
};
const closeUserPanelModal = () => {
  userDialogRef.value.close();
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

const handleLogout = () => {
  store.dispatch("logout").then(() => {
    router.push("login");
  });
};
const formatCreatedAt = (createdAt) => {
  return format(new Date(createdAt), "dd-MM-yyyy");
};
</script>
<style>
body {
  background-image: url("../assets/HomePage12.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-repeat: cover;
}

.card {
  /* height: 100%; */

  /* width: 380px; */
  background: #f8f8f8;
  transform: scale(1);
  transition: all 0.3s ease-in-out;
}
.card:hover {
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}
@media (min-width: 1060px) {
  .card {
    width: 400px;
    /* max-height: 400px;
    min-height: 150px; */
  }
}
@media (max-width: 699px) {
  .element {
    width: 100%;
  }
}
.btn-size {
  width: 320px;
}
</style>
