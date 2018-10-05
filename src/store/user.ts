import store from './store';
import { UserData } from '@/store/modules/user/types';
import { UserState } from '@/store/modules/user/types';

export default {
  state: store.state.user,

  dispatchSignIn(userData: UserData) {
    console.log('SIGNIN');
    store.dispatch('user/signIn', userData);
  },
  dispatchLogout() {
    store.dispatch('user/logout');
  },
};
