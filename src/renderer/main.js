import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  render (createElement) {
    return createElement('App');
  }
}).$mount('#app');

// Add inspect element on development
if (process.env.NODE_ENV === 'development') {
  const { remote } = require('electron')
  const { Menu, MenuItem } = remote

  let rightClickPosition = null

  const menu = new Menu()
  const menuItem = new MenuItem({
    label: 'Inspect Element',
    click: () => {
      remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
    }
  })
  menu.append(menuItem)

  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    rightClickPosition = { x: e.x, y: e.y }
    menu.popup(remote.getCurrentWindow())
  }, false)
}

