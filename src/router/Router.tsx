import { ReactNode, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin";
import Forbidden from "../pages/Forbidden";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { isAuthenticatedAdmin } from "../service/auth";

type PrivateAdminProps = {
  children: ReactNode;
};

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
      <Route path="/forbidden" element={<Forbidden />} />
    </Routes>
  );
}
