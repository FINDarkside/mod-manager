import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import Vue from 'vue';
import { get } from '@/helpers/util';
Vue.prototype.$get = get;
import './plugins/vuetify';
import App from './App.vue';
import router from './router/index';
import store from '@/store/store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// Add inspect element on development
if (process.env.NODE_ENV === 'development') {
  const { remote } = require('electron');
  const { Menu, MenuItem } = remote;

  let rightClickPosition: any = null;

  const menu = new Menu();
  const menuItem = new MenuItem({
    label: 'Inspect Element',
    click: () => {
      (<any>remote.getCurrentWindow()).inspectElement(rightClickPosition.x, rightClickPosition.y);
    },
  });
  menu.append(menuItem);

  window.addEventListener(
    'contextmenu',
    e => {
      e.preventDefault();
      rightClickPosition = { x: e.x, y: e.y };
      menu.popup(<any>remote.getCurrentWindow());
    },
    false
  );
}
