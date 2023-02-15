export interface IUser {
  username?: string;
  accessToken?: string;
  type?: string;
  refreshToken?: string;
  id?: number;
  email?: string;
  roles?: Array<string>;
}

export interface IContext extends IUser {
  authenticate: (response: IUser) => Promise<void>;
  logout: () => void;
}

export interface IAuthProvider {
  children: JSX.Element;
}
