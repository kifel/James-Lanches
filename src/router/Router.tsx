import { ReactNode, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin";
import Forbidden from "../pages/Forbidden";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import Orders from "../pages/Orders";
import RecoveryPassword from "../pages/RecoveryPassword";
import ConfirmCodePassword from "../pages/RecoveryPassword/ConfirmCodePassword";
import Register from "../pages/Register";
import ConfirmAccount from "../pages/Register/ConfirmAccount";
import {
  isAuthenticated,
  isAuthenticatedAdmin,
  isLogged
} from "../service/auth";

type PrivateAdminProps = {
  children: ReactNode;
};

interface RoutesPath {
  path: string;
}

/* A list of routes that are used in the `Router` function. */
export const pathsRoutesNavbarContent: RoutesPath[] = [
  {
    path: "/",
  },
  {
    path: "/admin",
  },
  {
    path: "/orders",
  },
  {
    path: "/confirm-account/:token",
  }
  // Adicione outras rotas aqui
];

/**
 * If the user is authenticated, render the children. If not, redirect to the login page
 * @param {PrivateAdminProps}  - JSX.Element
 */
const PrivateAdmin = ({ children }: PrivateAdminProps): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<String | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = await isAuthenticatedAdmin();
        setIsAuthenticated(auth);
        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated("false");
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center" style={{ fontSize: "45px" }}>
        Loading...
      </div>
    );
  } else if (isAuthenticated === "true") {
    return <>{children}</>;
  } else if (isAuthenticated === "Failed to refresh token") {
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
  } else {
    return <Navigate to="/forbidden" />;
  }
};

/**
 * If the user is authenticated, render the children. If not, redirect to the forbidden page.
 * @param {PrivateAdminProps}  - JSX.Element =&gt; {
 */
const PrivateRoute = ({ children }: PrivateAdminProps): JSX.Element => {
  const [isAuth, setIsAuthenticated] = useState<String | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = await isAuthenticated();
        setIsAuthenticated(auth);
        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated("false");
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center" style={{ fontSize: "45px" }}>
        Loading...
      </div>
    );
  } else if (isAuth === "true") {
    return <>{children}</>;
  } else if (isAuth === "Failed to refresh token") {
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
  } else {
    return <Navigate to="/forbidden" />;
  }
};

const IsLoggedIn = ({ children }: PrivateAdminProps): JSX.Element => {
  const auth = isLogged();

  if (!auth) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <IsLoggedIn>
            <Login />
          </IsLoggedIn>
        }
      />
      <Route
        path="/recovery-password"
        element={
          <IsLoggedIn>
            <RecoveryPassword />
          </IsLoggedIn>
        }
      />
      <Route
        path="/recovery-password/:token"
        element={
          <IsLoggedIn>
            <ConfirmCodePassword />
          </IsLoggedIn>
        }
      />
      <Route
        path="/register"
        element={
          <IsLoggedIn>
            <Register />
          </IsLoggedIn>
        }
      />
      <Route
        path="/confirm-account/:token"
        element={
          <IsLoggedIn>
            <ConfirmAccount />
          </IsLoggedIn>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateAdmin>
            <Admin />
          </PrivateAdmin>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
      />
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}
