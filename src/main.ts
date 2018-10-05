import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router/index';
import store from '@/store/store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
