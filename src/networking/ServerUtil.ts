import * as Util from '@/helpers/util';
import { UserData } from '@/store/modules/user/types';

export async function login(username: string, password: string): Promise<RequestResponse<UserData>> {
  await Util.wait(1500);
  return {
    data: {
      username: username,
      sessionId: 'TEST',
      id: 'FUNNYID',
      profilePicture: 'asdasdasd',
    },
  };
}

export async function register(username: string, password: string, email: string): Promise<RequestResponse<UserData>> {
  await Util.wait(2000);
  return {
    data: {
      username: username,
      sessionId: 'TEST',
      id: 'FUNNYID',
      profilePicture: 'asdasdasd',
    },
  };
}

export async function isUsernameAvailable(username: string) {
  await Util.wait(500);
  return Math.random() < 0.5;
}

interface RequestResponse<T> {
  data: T;
}
