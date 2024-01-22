<template>
  <div class="shopping-list-view">
    <div
      class="shopping-list-view-content-header bg-green-900 mt-2 rounded-t-xl"
    >
      <router-link class="pl-2 md:hidden pt-2" to="/">
        <button class="mt-2">
          <Icon icon="mdi:arrow-left" color="white" class="w-5 h-5" />
        </button>
      </router-link>
      <div class="header-top flex flex-col justify-around items-center p-3">
        <p class="text-xl font-bold text-white">{{ shoppingList.name }}</p>
        <p class="text-xs text-slate-200 text-center mb-1">
          Data utworzenia: {{ formatCreatedAt(shoppingList.created_at) }}
        </p>
      </div>
    </div>
    <div class="shopping-list-view-content bg-white p-2 opacity-90">
      <div class="add-to-list-wrapper flex gap-2">
        <MTomSelect class="flex-1" @on-change="(v) => onChange(v)" />
      </div>
      <div class="bg-white rounded-b-xl overflow-auto shopping-list">
        <ul
          class=""
          v-for="category in shoppingList.categories"
          :key="category.id"
        >
          <div class="flex items-center mt-4">
            <button class="mb-1">
              <!-- @click="toggleContent(category.id)" -->
              <Icon class="w-5 h-5" icon="mdi:chevron-up"></Icon>
              <!-- :icon="
                  isCategoryExpanded[category.id]
                    ? 'mdi:chevron-up'
                    : 'mdi:chevron-down'
                " -->
            </button>
            <h6 class="text-sm text-slate-500 font-bold ml-2 mb-1">
              {{ category.category_name }}
            </h6>
          </div>
          <!-- v-if="isCategoryExpanded[category.id]" -->
          <li
            class="flex mx-5 items-center"
            v-for="product in category.products"
            :key="product.id"
          >
            <label class="flex items-center ml-2">
              <input
                type="checkbox"
                class="w-4 h-4 rounded-xl"
                :checked="product.checked"
                @change="
                  (e) => updateCheckedForProduct(product, e.target.checked)
                "
              />
              <span :class="{ 'line-through': product.checked }" class="ml-3">{{
                product.name
              }}</span>
            </label>
            <input
              placeholder="x"
              class="text-sm ml-auto mr-2 block w-5 h-5 border rounded-md text-center"
              type="text"
              maxlength="2"
              :value="product.quantity"
              @change="(value) => updateQuantity(product, value)"
            />
            <!-- @change="updateQuantity(product.quantity, product.id)" -->
            <button class="ml-1" @click="removeProductFromList(product.id)">
              <Icon icon="bi:trash-fill" color="grey "></Icon>
            </button>
            <!-- <progress
              class=""
              v-if="product.quantity"
              :value="checkedProductsCount(product)"
              :max="product.quantity.length"
            ></progress> -->
          </li>
          <hr class="mx-2 my-1" />
        </ul>
      </div>
      <div class="shopping-list-view-bottom rounded-xl bg-green-900">
        <div class="flex justify-around my-4 py-4">
          <button @click="showShareModal">
            <Icon
              class="text-2xl"
              color="white"
              icon="material-symbols:share-outline"
            ></Icon>
          </button>
          <button @click="showAddProductModal">
            <Icon color="white" class="text-2xl" icon="lucide:plus"></Icon>
          </button>
          <!-- <button>
            <router-link class="lg:hidden" to="/">
              <Icon color="white" class="text-2xl" icon="tabler:home"></Icon>
            </router-link>
          </button> -->
          <button @click="removeUserFromList">
            <Icon icon="bi:trash" color="white" class="text-2xl"></Icon>
          </button>
        </div>
      </div>
    </div>
  </div>
  <dialog class="rounded-xl" ref="dialogRef">
    <ShareDialogContent
      @on-confirm="(v) => onShareConfirm(v)"
      @on-close="onShareClose"
      :message="shareMessage"
    />
  </dialog>
  <dialog class="rounded-xl" ref="addProductDialogRef">
    <div class="">
      <!-- <button @on-close="onAddProductModalClose">x</button> -->
      <p class="text-xl">Dodaj nowy produkt</p>
      <hr />
      <input
        v-model="productName"
        class="py-2 my-2 w-full"
        type="text"
        name="name"
        maxlength="25"
        placeholder="Podaj nazwę produktu"
      />

      <p class="text-lg mb-2">Kategoria:</p>
      <hr />
      <div class="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-2">
        <div v-for="item in categories" :key="item.id">
          <input
            type="radio"
            :id="`category-${item.id}`"
            :value="item.id"
            v-model="selectedCategory"
          />
          <label class="ml-2" :for="`category-${item.id}`">{{
            item.category_name
          }}</label>
        </div>
      </div>
      <hr class="mt-2" />
      <div class="flex mt-3">
        <button class="bg-green-900 p-2 rounded-lg ml-auto" @click="addProduct">
          <span class="text-white"> Dodaj Produkt</span>
        </button>
      </div>
    </div>
  </dialog>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { format } from "date-fns";
import {
  attachProductToList,
  detachProductFromList,
  updateProductQuantity,
  updateChecked,
  shareList,
  fetchCategory,
  addNewProduct,
} from "../api/api";
import MTomSelect from "../components/TomSelect/MTomSelect.vue";
import ShareDialogContent from "../components/ShareDialog/ShareDialogContent.vue";
import AddProductDialogContent from "../components/AddProductDialog/AddProductDialogContent.vue";
import router from "../router";
const store = useStore();
const props = defineProps(["id"]);
const categories = ref([]);
const productName = ref("");
const selectedCategory = ref(null);
const userId = computed(() => store.getters.getUserId);

const shoppingList = computed(() =>
  store.getters.getShoppingListById(props.id)
);
console.log("lista z shoppingListView", shoppingList);
const productId = ref(null);
const dialogRef = ref(null);
const addProductDialogRef = ref(null);
const shareMessage = ref("a");

// onMounted(async () => {
//   try {
//     const response = await fetchCategory();
//     categories.value = response.data;
//   } catch (error) {
//     console.error(error);
//   }
// });
fetchCategory().then((response) => {
  categories.value = response.data;
});

const addProduct = () => {
  if (!productName.value || !selectedCategory.value) {
    console.error("Wprowadź nazwę produktu i wybierz kategorię.");
    return;
  }

  const productData = {
    name: productName.value,
    category_id: selectedCategory.value,
  };

  addNewProduct(productData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
const addToList = async () => {
  const response = await attachProductToList(props.id, productId.value);
  store.dispatch("showListById", props.id);
};
const onChange = ({ value }) => {
  productId.value = value;
  addToList();
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

const removeUserFromList = () => {
  store
    .dispatch("detachUserFromList", { listId: props.id, userId: userId.value })
    .then(() => {
      store.dispatch("userListFetch", userId.value);
      router.push("/");
    });
};

const updateCheckedForProduct = async ({ id }, checked) => {
  const response = await updateChecked(props.id, id, checked);

  store.dispatch("showListById", props.id);

  console.log(shoppingList.value);
};

const showShareModal = () => {
  dialogRef.value.showModal();
};
const showAddProductModal = () => {
  addProductDialogRef.value.showModal();
};
const onAddProductModalClose = () => {
  addProductDialogRef.value.close();
};
const onShareConfirm = ({ email }) => {
  console.log("ShoppingListView: ", email);

  shareList(props.id, email)
    .then((response) => {
      shareMessage.value = { text: response.data.message, success: true };
    })
    .catch((error) => {
      shareMessage.value = {
        text: error.response.data.message,
        success: false,
      };
    });
};

const onShareClose = () => {
  dialogRef.value.close();
};
const isCategoryExpanded = ref({});

const toggleContent = (categoryId) => {
  isCategoryExpanded.value[categoryId] = !isCategoryExpanded.value[categoryId];
};

const formatCreatedAt = (createdAt) => {
  return format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss");
};
</script>
<style>
body {
  /* background-color: rgb(22 163 74); */
}
/* .shopping-list {
  width: 700px;
  max-height: 400px;
  min-height: 150px;
} */
@media (min-width: 1060px) {
  .shopping-list {
    width: 600px;
    max-height: 400px;
    min-height: 150px;
  }
}

dialog::backdrop {
  background-color: black;
  opacity: 0.54;
}
</style>
