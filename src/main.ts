import './assets/main.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import VueApexCharts from 'vue3-apexcharts'
import clickOutside from './components/common/v-click-outside.vue'

// ✅ استيراد Navigation Service
import { vueRouterNavigationService } from './services/navigation.service';
import { useAuthStore } from './stores/auth.store';
//import { localStorageService } from './services/storage.service';

const app = createApp(App)
const pinia = createPinia();

app.use(router)
app.use(VueApexCharts)
app.use(pinia);

// ✅ حقن Router في Navigation Service
vueRouterNavigationService.setRouter(router);

// ✅ تحميل حالة المصادقة عند بدء التطبيق
const authStore = useAuthStore();
authStore.initializeAuth();
//localStorageService.clear(); // تنظيف التخزين المحلي عند بدء التطبيق

app.directive('click-outside', clickOutside)

app.mount('#app')