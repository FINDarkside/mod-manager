import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { user } from './modules/user';
import { general } from './modules/general';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: { user, general },
};

export default new Vuex.Store<RootState>(store);
