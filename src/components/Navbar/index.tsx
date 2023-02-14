import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "styled-components";
import {
  LinkItemNavbar,
  LogoColor,
  NavLink,
  ThemeButton,
  ThemeDropdown,
  ThemeList
} from "./styles";

interface Props {
  toggleTheme(themeString: string): void;
}

const Navbar: React.FC<Props> = ({ toggleTheme }) => {
  const { title } = useContext(ThemeContext);
  const location = useLocation();
  const basePaths = {
    "/": "Home",
    "/products": "Products",
    "/categories": "Categories",
    "/cart": "Cart",
  };

  const themeLight = title === "light";
  const themeDark = title === "dark";

  const toggleThemeLight = () => {
    toggleTheme("dark");
  };

  const toggleThemeDark = () => {
    toggleTheme("light");
  };

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" ? (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <NavLink className="navbar-brand fw-bold fs-4 text-white" to="/">
              JAMES <LogoColor>LANCHES</LogoColor>
            </NavLink>
            <button
              className="navbar-toggler custom-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                {Object.entries(basePaths).map(([path, label]) => {
                  const isActive: Boolean =
                    path === "/"
                      ? location.pathname === path
                      : location.pathname.startsWith(path);
                  return (
                    <li key={path} className="nav-item">
                      {path === "/cart" ? (
                        <>
                          <LinkItemNavbar
                            to={path}
                            isactive={isActive.toString()}
                            className="ms-4"
                          >
                            <i className="fa fa-shopping-cart me-2"> </i>
                            {label}
                          </LinkItemNavbar>
                        </>
                      ) : (
                        <LinkItemNavbar
                          to={path}
                          isactive={isActive.toString()}
                          className="ms-4"
                        >
                          {label}
                        </LinkItemNavbar>
                      )}
                    </li>
                  );
                })}
                <li className="nav-item dropdown">
                  <ThemeDropdown
                    className="dropdown-toggle ms-4"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Themes
                  </ThemeDropdown>
                  <ul className="dropdown-menu bg-dark">
                    <ThemeList>
                      <ThemeButton
                        onClick={toggleThemeLight}
                        className="btn"
                        isactive={themeLight.toString()}
                      >
                        <i className="fa fa-sun-o me-1"> </i>
                        Tema Claro
                      </ThemeButton>
                    </ThemeList>
                    <ThemeList>
                      <ThemeButton
                        onClick={toggleThemeDark}
                        className="btn"
                        isactive={themeDark.toString()}
                      >
                        <i className="fa fa-moon-o me-2"> </i>
                        Tema Escuro
                      </ThemeButton>
                    </ThemeList>
                  </ul>
                </li>
              </ul>
              <div className="buttons">
                <NavLink to="/login" className="btn">
                  <i className="fa fa-sign-in me-1"> Login</i>
                </NavLink>
                <NavLink to="/login" className="btn">
                  Register
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
