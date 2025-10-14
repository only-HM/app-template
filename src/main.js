import { createApp } from 'vue';
import '@/style.css';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import Vant from 'vant';
import 'vant/lib/index.css';
// import VConsole from 'vconsole';

const app = createApp(App);

// new VConsole();

app
  .use(store)
  .use(router)
  .use(Vant)
  .mount('#app');