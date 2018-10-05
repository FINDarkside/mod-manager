export interface UserState {
  userData: UserData | null;
  loggedIn: boolean;
}

export interface UserData {
  username: string;
  id: string;
  profilePicture: string;
  sessionId: string;
}
