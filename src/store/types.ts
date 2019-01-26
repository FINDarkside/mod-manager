import { UserState } from './modules/user/types';
import { GeneralState } from './modules/general/types';

export interface RootState {
  user: UserState;
  general: GeneralState;
}

