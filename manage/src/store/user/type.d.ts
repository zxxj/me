interface UserInfo {
  id: number;
  username: string;
  avatar?: string;
  email: string;
  provider?: string;
  providerId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserState {
  token: string;
  userInfo: UserInfo | null;
  setToken: (token: string) => void;
  setUserInfo: (user: UserInfo) => void;
  clearState: () => void;
}
