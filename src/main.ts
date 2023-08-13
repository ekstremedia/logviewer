import { createApp } from 'vue'
import './style.css'
import './tw.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
