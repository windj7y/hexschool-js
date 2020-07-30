import Vue from 'vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.component('Loading', Loading);

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
