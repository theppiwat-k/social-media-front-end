import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/userState';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle';

const app = createApp(App);

// app.use(store);
app.use(store).use(router).mount('#app');


