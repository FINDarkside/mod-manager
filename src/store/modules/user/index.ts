import { ActionTree, MutationTree, Module } from 'vuex';
import { UserState, UserData } from './types';
import { RootState } from '../../types';

export const defaultState: UserState = {
  userData: null,
  loggedIn: true,
};

export const actions: ActionTree<UserState, RootState> = {
  logout(state) {
    state.commit('setUserData', null);
    state.commit('setLoggedIn', false);
  },
  signIn(state, userData: UserData) {
    state.commit('setUserData', userData);
    state.commit('setLoggedIn', true);
  },
};

export const mutations: MutationTree<UserState> = {
  setUserData(state, user: UserData) {
    console.log('setUser');
    console.log(JSON.stringify(user));
    state.userData = user;
  },
  setLoggedIn(state, val: boolean) {
    state.loggedIn = true;
  },
};

const namespaced: boolean = true;

export const user: Module<UserState, RootState> = {
  namespaced,
  state: defaultState,
  getters: {},
  actions,
  mutations,
};
