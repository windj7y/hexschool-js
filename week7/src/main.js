import Vue from 'vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Toastr from 'vue-toastr';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {
  ValidationObserver,
  ValidationProvider, configure, localize, extend,
} from 'vee-validate'; // 驗證套件
import * as rules from 'vee-validate/dist/rules'; // 規則檔案（ex: email...）
import zhTW from 'vee-validate/dist/locale/zh_TW.json'; // 語系檔案
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

window.$ = $;

Vue.component('Loading', Loading);

// vee-validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
}); // 所有驗證規則

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

localize('tw', zhTW);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

// 千分位
Vue.filter('money', (num) => {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
});

const toastrConfig = {
  defaultTimeout: 3000,
  defaultPosition: 'toast-bottom-right',
  defaultStyle: { 'font-family': '"微軟正黑體", "Microsoft JhengHei", Arial, Verdana, sans-serif' },
};

Vue.use(Toastr, toastrConfig);
Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
