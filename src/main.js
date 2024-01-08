import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./api/api";
import "./assets/main.css";
import "./assets/tailwind.css";
import store from "./store";

const app = createApp(App);

app.use(router, store);

app.mount("#app");
