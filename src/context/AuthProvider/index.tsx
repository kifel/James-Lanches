import { createContext } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  async function authenticate(response: IUser) {
    if (response !== undefined) {
      setUserLocalStorage(response);
    }
  }

  function logout() {
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};