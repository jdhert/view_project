import { createApp } from 'vue'
import { router } from './router/router.js'
import App from './App.vue'
import axios from 'axios'
import VueCookies from "vue-cookies";
import store from './store/store';


const app = createApp(App);
app.config.globalProperties.axios = axios
app.use(router)
app.use(VueCookies)
app.use(store);
app.mount('#app')