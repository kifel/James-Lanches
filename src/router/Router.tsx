import { ReactNode, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin";
import Forbidden from "../pages/Forbidden";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Orders from "../pages/Orders";
import { isAuthenticated, isAuthenticatedAdmin } from "../service/auth";

type PrivateAdminProps = {
  children: ReactNode;
};

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
    return <Navigate to="/login" />;
  } else {
    return <Navigate to="/forbidden" />;
  }
};

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
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
    </Routes>
  );
}
