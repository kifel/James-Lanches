import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { Data } from "../../@types/globalTypes";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import api from "../../service/api";
import {
  ButtonUser,
  DropDownUL,
  ImageUser,
  LinkItemNavbar,
  LogoColor,
  MenuBurger,
  Nav,
  NavCart,
  NavLink,
  NavLogo,
  ThemeButton,
  ThemeDropdown,
  ThemeList,
  UserLink,
  UserList
} from "./styles";

interface Props {
  toggleTheme(themeString: string): void;
}

const ShowHeader = ({ toggleTheme }: Props) => {
  const { title } = useContext(ThemeContext);
  const themeLight = title === "light";
  const themeDark = title === "dark";
  const theme = title === "light" ? true : false;

  const toggleThemeLight = () => {
    toggleTheme("dark");
  };

  const toggleThemeDark = () => {
    toggleTheme("light");
  };
  const basePaths = {
    "/": "Home",
    "/products": "Products",
    "/categories": "Categories",
  };

  return (
    <>
      <Nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
        <div className="container">
          <NavLogo className="fw-bold fs-4" to="/">
            JAMES <LogoColor>LANCHES</LogoColor>
          </NavLogo>
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MenuBurger
              className="navbar-toggler-icon"
              themeAtive={theme}
            ></MenuBurger>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {Object.entries(basePaths).map(([path, label]) => {
                const isActive: Boolean =
                  path === "/"
                    ? location.pathname === path
                    : location.pathname.startsWith(path);
                return (
                  <li key={path} className="nav-item">
                    <LinkItemNavbar
                      to={path}
                      isactive={isActive.toString()}
                      className="ms-4"
                    >
                      {label}
                    </LinkItemNavbar>
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
                <DropDownUL className="dropdown-menu">
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
                </DropDownUL>
              </li>
            </ul>
            <div className="buttons">
              {(() => {
                const isActiveCart: Boolean =
                  location.pathname === "/cart"
                    ? location.pathname === "/cart"
                    : location.pathname.startsWith("/cart");
                return (
                  <>
                    <NavCart
                      to="/cart"
                      className="btn"
                      isactive={isActiveCart.toString()}
                    >
                      <i className="fa fa-shopping-cart me-2"></i>
                    </NavCart>
                  </>
                );
              })()}
              <NavLink to="/login" className="btn">
                <i className="fa fa-sign-in me-1"> Login</i>
              </NavLink>
              <NavLink to="/login" className="btn">
                Register
              </NavLink>
            </div>
          </div>
        </div>
      </Nav>
    </>
  );
};

const ShowLoggedHeader = ({ toggleTheme }: Props) => {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setProdutos] = useState<Data>();
  const [error, setError] = useState(null);
  const { title } = useContext(ThemeContext);
  const themeLight = title === "light";
  const themeDark = title === "dark";
  const navigate = useNavigate();

  const theme = title === "light" ? true : false;

  useEffect(() => {
    api
      .get("/users/logged")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        if (error.message === "Failed to refresh token") {
          navigate("/login");
        }
        setError(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  const logout = () => {
    api
      .post("/auth/signout")
      .then(() => {
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => {
        if (error.message === "Failed to refresh token") {
          navigate("/login");
        }
        setError(error);
      });
  };

  const toggleThemeLight = () => {
    toggleTheme("dark");
  };

  const toggleThemeDark = () => {
    toggleTheme("light");
  };
  const basePaths = {
    "/": "Home",
    "/products": "Products",
    "/categories": "Categories",
    "/orders": "Orders",
  };

  return (
    <>
      <Nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <NavLogo className="fw-bold fs-4" to="/">
            JAMES <LogoColor>LANCHES</LogoColor>
          </NavLogo>
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MenuBurger
              className="navbar-toggler-icon"
              themeAtive={theme}
            ></MenuBurger>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {Object.entries(basePaths).map(([path, label]) => {
                const isActive: Boolean =
                  path === "/"
                    ? location.pathname === path
                    : location.pathname.startsWith(path);
                return (
                  <li key={path} className="nav-item">
                    <LinkItemNavbar
                      to={path}
                      isactive={isActive.toString()}
                      className="ms-4"
                    >
                      {label}
                    </LinkItemNavbar>
                  </li>
                );
              })}
            </ul>
            <div className="buttons navbar-nav mx-auto mb-2 mb-lg-0">
              <li>
                {(() => {
                  const isActiveCart: Boolean =
                    location.pathname === "/cart"
                      ? location.pathname === "/cart"
                      : location.pathname.startsWith("/cart");
                  return (
                    <>
                      <NavCart
                        to="/cart"
                        className="btn ms-4"
                        isactive={isActiveCart.toString()}
                      >
                        <i className="fa fa-shopping-cart"></i>
                      </NavCart>
                    </>
                  );
                })()}
              </li>
              <li className="nav-item dropdown mt-2">
                <ThemeDropdown
                  className="dropdown-toggle ms-4"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Themes
                </ThemeDropdown>
                <DropDownUL className="dropdown-menu">
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
                </DropDownUL>
              </li>
              <li className="nav-item dropdown">
                <ThemeDropdown
                  className="dropdown-toggle ms-4"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <ImageUser src={data?.imageUrl} alt="User Image" />
                </ThemeDropdown>
                <DropDownUL className="dropdown-menu">
                  <UserList>
                    {(() => {
                      if (data && data.roles && data.roles.length > 0) {
                        for (let i = 0; i < data.roles.length; i++) {
                          if (data.roles[i].name == "ROLE_ADMIN") {
                            return (
                              <>
                                <UserLink
                                  className="btn text-color"
                                  to="/admin"
                                >
                                  Admin
                                </UserLink>
                              </>
                            );
                          }
                        }
                      }
                    })()}
                  </UserList>
                  <UserList>
                    <ButtonUser className="btn text-color" onClick={logout}>
                      Logout
                    </ButtonUser>
                  </UserList>
                </DropDownUL>
              </li>
            </div>
          </div>
        </div>
      </Nav>
    </>
  );
};

const Navbar: React.FC<Props> = ({ toggleTheme }) => {
  const location = useLocation();
  const user = getUserLocalStorage();

  return (
    <>
      {(() => {
        if (
          location.pathname !== "/login" &&
          location.pathname !== "/register"
        ) {
          if (user === undefined || user === null) {
            return (
              <>
                <ShowHeader toggleTheme={toggleTheme} />
              </>
            );
          } else {
            return (
              <>
                <ShowLoggedHeader toggleTheme={toggleTheme} />
              </>
            );
          }
        }
      })()}
    </>
  );
};

export default Navbar;
