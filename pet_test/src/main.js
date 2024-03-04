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
window.Kakao.init("c2a63c53b4bb9f45634c727367987e63");
app.mount('#app')