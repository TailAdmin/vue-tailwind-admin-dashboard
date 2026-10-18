import 'flatpickr/dist/flatpickr.css'
import 'jsvectormap/dist/jsvectormap.css'
// App styles last so they override vendor CSS
import './assets/main.css'

import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import router from './router'
import { initRTL } from './composables/useRTL'

initRTL()

const app = createApp(App)

app.use(router)
app.use(VueApexCharts)

app.mount('#app')
