import { postListStore } from '@/store/posts';
import { idStatusListStore } from '@/store/id-status'
import { createPinia } from 'pinia';
import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)

postListStore();
idStatusListStore();


createApp(App).mount('#app')
