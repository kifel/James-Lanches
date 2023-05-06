import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { Data } from "../../@types/globalTypes";
import { IUser } from "../../context/AuthProvider/types";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import { pathsRoutesNavbarContent } from "../../router/Router";
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
  UserList,
} from "./styles";

interface Props {
  toggleTheme(themeString: string): void;
}

interface PropsLogged {
  toggleTheme(themeString: string): void;
  user: IUser;
}

/* The above code is a React component that is using TypeScript. */
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
    "/products": "Produto",
    "/contact-us": "Contate-nos",
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
                  Opções de tema
                </ThemeDropdown>
                <DropDownUL className="dropdown-menu">
                  <ThemeList>
                    <ThemeButton
                      onClick={toggleThemeLight}
                      className="btn"
                      isactive={themeLight.toString()}
                    >
                      <i className="bi bi-brightness-high-fill me-2"></i>
                      Modo claro
                    </ThemeButton>
                  </ThemeList>
                  <ThemeList>
                    <ThemeButton
                      onClick={toggleThemeDark}
                      className="btn"
                      isactive={themeDark.toString()}
                    >
                      <i className="bi bi-moon-stars-fill me-2"></i>
                      Modo noturno
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
                      type="button"
                      className="btn position-relative ms-4"
                    >
                      <i className="bi bi-basket"></i>
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-2"
                        style={{ fontSize: "10px" }}
                      >
                        99+
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </NavCart>
                  </>
                );
              })()}
              <NavLink to="/login" className="btn">
                <i className="fa fa-sign-in me-1"></i>
                Login
              </NavLink>
              <NavLink to="/register" className="btn">
                Cadastre-se
              </NavLink>
            </div>
          </div>
        </div>
      </Nav>
    </>
  );
};

/* The above code is a React component that is responsible for rendering the header of the application. */
const ShowLoggedHeader = ({ toggleTheme, user }: PropsLogged) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [data, setData] = useState<Data>();
  const [error, setError] = useState(null);
  const { title } = useContext(ThemeContext);
  const themeLight = title === "light";
  const themeDark = title === "dark";
  const navigate = useNavigate();

  const theme = title === "light" ? true : false;

  useEffect(() => {
    const loadingUser = async () => {
      await api
        .get("/users/logged")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          if (error.message === "Failed to refresh token") {
            localStorage.removeItem("user");
            navigate("/login");
          }
          setError(error);
        })
        .finally(() => {
          setIsFetching(false);
        });
    };
    return () => {
      loadingUser();
    };
  }, []);

  useEffect(() => {
    const loadingRoles = () => {
      if (data && data.roles && data.roles.length > 0) {
        for (let i = 0; i < data.roles.length; i++) {
          if (data.roles[i].name == "ROLE_ADMIN") {
            setIsAdmin(true);
          }
        }
      } else {
        setIsAdmin(false);
      }
    };
    loadingRoles();
  }, [data]);

  const logout = () => {
    api
      .post("/auth/signout", {
        refreshToken: user.refreshToken,
      })
      .then(() => {
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => {
        if (error.message === "Failed to refresh token") {
          localStorage.removeItem("user");
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
    "/products": "Produto",
    "/contact-us": "Contate-nos",
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
              <li className="nav-item dropdown">
                <ThemeDropdown
                  className="dropdown-toggle ms-4"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Opções de tema
                </ThemeDropdown>
                <DropDownUL className="dropdown-menu">
                  <ThemeList>
                    <ThemeButton
                      onClick={toggleThemeLight}
                      className="btn"
                      isactive={themeLight.toString()}
                    >
                      <i className="bi bi-brightness-high-fill me-2"></i>
                      Modo claro
                    </ThemeButton>
                  </ThemeList>
                  <ThemeList>
                    <ThemeButton
                      onClick={toggleThemeDark}
                      className="btn"
                      isactive={themeDark.toString()}
                    >
                      <i className="bi bi-moon-stars-fill me-2"></i>
                      Modo noturno
                    </ThemeButton>
                  </ThemeList>
                </DropDownUL>
              </li>
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
                        type="button"
                        className="btn position-relative ms-4 mt-1"
                      >
                        <i className="bi bi-basket"></i>
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-2"
                          style={{ fontSize: "10px" }}
                        >
                          99+
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      </NavCart>
                    </>
                  );
                })()}
              </li>
              <li className="nav-item dropdown me-5">
                {isFetching ? (
                  ""
                ) : (
                  <>
                    <ThemeDropdown
                      className="dropdown-toggle ms-4"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <ImageUser
                        src={data?.imageUrl}
                        alt="User Image"
                        className="mt-1"
                      />
                    </ThemeDropdown>
                    <DropDownUL className="dropdown-menu">
                      <UserList>
                        {isAdmin === true ? (
                          <>
                            <UserLink className="btn text-color" to="/admin">
                              <i className="bi bi-person-lock me-2"></i>
                              Admin
                            </UserLink>
                          </>
                        ) : (
                          ""
                        )}
                      </UserList>
                      <UserList>
                        <UserLink className="btn text-color" to="/orders">
                          <i className="bi bi-receipt me-2"></i>
                          Meus pedidos
                        </UserLink>
                      </UserList>
                      <UserList>
                        <UserLink className="btn text-color" to="/settings">
                          <i className="bi bi-gear me-2"></i>
                          Configuração
                        </UserLink>
                      </UserList>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <UserList>
                        <ButtonUser className="btn text-color" onClick={logout}>
                          <i className="bi bi-box-arrow-left me-2"></i>
                          Sair
                        </ButtonUser>
                      </UserList>
                    </DropDownUL>
                  </>
                )}
              </li>
            </div>
          </div>
        </div>
      </Nav>
    </>
  );
};

/* Checking if the user is logged in or not. If the user is logged in, it will show the
ShowLoggedHeader component. If the user is not logged in, it will show the ShowHeader component. */
const Navbar: React.FC<Props> = ({ toggleTheme }) => {
  const location = useLocation();
  const user = getUserLocalStorage();
  const showNavbar = pathsRoutesNavbarContent.some((r) =>
    new RegExp(`^${r.path.replace(/:\w+/g, "[\\w-]+")}$`).test(
      location.pathname
    )
  );

  /* Setting the title of the page based on the pathname. */
  useEffect(() => {
    const path = location.pathname;
    let newTitle;

    if (path === "/") {
      newTitle = "Página Inicial - James Lanches";
    } else {
      const parts = path.split("/");
      const firstPart = parts[1];
      const capitalizedFirstPart =
        firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
      newTitle = `${capitalizedFirstPart} - James Lanches`;
    }

    document.title = newTitle;
  }, [location.pathname]);

  return (
    <>
      {(() => {
        if (showNavbar) {
          if (user === undefined || user === null) {
            return (
              <>
                <ShowHeader toggleTheme={toggleTheme} />
              </>
            );
          } else {
            return (
              <>
                <ShowLoggedHeader toggleTheme={toggleTheme} user={user} />
              </>
            );
          }
        }
      })()}
    </>
  );
};

export default Navbar;
