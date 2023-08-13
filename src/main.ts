import { createApp } from 'vue'
import './style.css'
import './tw.css'
import App from './App.vue'

createApp(App).mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
