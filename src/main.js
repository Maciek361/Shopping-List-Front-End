import { createApp } from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import App from "./App.vue";
import router from "./router";
import appStore from "./store";

import "./api/api";
import "./assets/main.css";
import "./assets/tailwind.css";

const vuexLocalStorage = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.localStorage,
  reducer: (state) => state,
});

const store = new Vuex.Store({
  ...appStore,
  plugins: [vuexLocalStorage.plugin],
});

const app = createApp(App);

app.use(router).use(store);

app.mount("#app");
