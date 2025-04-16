import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'aos/dist/aos.css' // AOS CSS faylı
import AOS from 'aos' // AOS JavaScript kitabxanası
import './assets/main.css';
import 'remixicon/fonts/remixicon.css' 

const app = createApp(App)

app.use(router)

app.mount('#app')

// AOS-u başlat
AOS.init()