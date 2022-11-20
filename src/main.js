import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/state";
const app = createApp(App);

// app.use(store);
app.use(store).use(router).mount("#app");

import "bootstrap/dist/js/bootstrap.js";
