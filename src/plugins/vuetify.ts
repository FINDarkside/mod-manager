import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify, {
  theme: {
    primary: '#f45c42',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
  customProperties: true,
  iconfont: 'md',
});