import store from './store';

export default {
  state: store.state.general,

  hideLoginPage() {
    store.dispatch('general/hideLoginScreen');
  },
  showLoginPage() {
    store.dispatch('general/showLoginScreen');
  },
  setDarkMode(val: boolean) {
    store.commit('general/setDarkMode', val);
  },
};
