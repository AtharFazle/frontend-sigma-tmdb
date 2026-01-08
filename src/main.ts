import { createApp } from 'vue'
import '@/assets/index.css'
import App from './App.vue'
import router from './lib/route'
import { VueQueryPlugin } from '@tanstack/vue-query';
import vueQueryPluginOptions from './lib/queryClient';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.use(VueQueryPlugin,vueQueryPluginOptions)
app.use(VueSweetalert2);

app.use(router);

app.mount('#app');
