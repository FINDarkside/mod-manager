const state = {
  visible: false
}

const mutations = {
  LOGIN_PAGE_SET_VISIBLE (state, b) {
    state.visible = b;
  }
}

const actions = {
  showLoginPage () {
    this.commit('LOGIN_PAGE_SET_VISIBLE', true);
  },
  hideLoginPage(){
    this.commit('LOGIN_PAGE_SET_VISIBLE', false);
  }
}

export default {
  state,
  mutations,
  actions
}
