import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';



import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

createApp(App).use(PrimeVue).use(ToastService).use(ConfirmationService).use(store).use(VueAxios,axios).use(router).mount('#app')
