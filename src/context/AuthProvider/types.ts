export interface IUser {
  accessToken: string;
  type: string;
  refreshToken: string;
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface IContext extends IUser {
  authenticate: (response: IUser) => Promise<void>;
}

export interface IAuthProvider {
  children: JSX.Element;
}
