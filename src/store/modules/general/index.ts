import { ActionTree, MutationTree, Module } from 'vuex';
import { RootState } from '../../types';
import { GeneralState } from './types';

export const defaultState: GeneralState = {
  loginScreenVisible: false,
  darkMode: false,
};

export const mutations: MutationTree<GeneralState> = {
  setLoginScreenVisible(state, val: boolean) {
    state.loginScreenVisible = val;
  },
  setDarkMode(state, val: boolean) {
    state.darkMode = val;
  },
};

export const actions: ActionTree<GeneralState, RootState> = {
  showLoginScreen(state) {
    state.commit('setLoginScreenVisible', true);
  },
  hideLoginScreen(state) {
    state.commit('setLoginScreenVisible', false);
  },
};

const namespaced: boolean = true;

export const general: Module<GeneralState, RootState> = {
  namespaced,
  state: defaultState,
  getters: {},
  actions,
  mutations,
};
