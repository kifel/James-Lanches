import { shade } from "polished";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

interface LinkItemProps extends LinkProps {
  isactive?: string;
}

interface Props {
  isactive: string;
}

interface Theme {
  themeAtive: Boolean;
}

export const Nav = styled.nav`
  -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  background: ${(props) => props.theme.colors.backgroundNavbar};
`;

export const NavLink = styled(Link)`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.1rem;
  font-weight: 500;
  font-weight: 500;
  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const NavLogo = styled(Link)`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.1rem;
  font-weight: 500;
  font-weight: 500;
  text-decoration: none;
`;

export const NavCart = styled(Link)<LinkItemProps>`
  color: ${(props) =>
    props.isactive == "true"
      ? props.theme.colors.secondary
      : props.theme.colors.text};
  font-size: 1.1rem;
  font-weight: 500;
  font-weight: 500;
  &:hover {
    color: ${(props) =>
      props.isactive == "true"
        ? shade(0.5, props.theme.colors.secondary)
        : props.theme.colors.secondary};
  }
`;

export const LogoColor = styled.span`
  color: ${(props) => props.theme.colors.secondary};
`;

export const LinkItemNavbar = styled(Link)<LinkItemProps>`
  color: ${(props) =>
    props.isactive == "true"
      ? props.theme.colors.secondary
      : props.theme.colors.text};
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.5s ease;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    color: ${(props) =>
      props.isactive == "true"
        ? shade(0.5, props.theme.colors.secondary)
        : props.theme.colors.secondary};
  }
`;

export const DropDownUL = styled.ul`
  background: ${(props) => props.theme.colors.backgroundNavbar};
`;

export const ThemeList = styled.li`
  &:hover {
    background: ${(props) => shade(0.2, props.theme.colors.backgroundNavbar)};
  }
`;

export const ThemeDropdown = styled.a`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.1rem;
  transition: all 0.5s ease;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const ThemeButton = styled.button<Props>`
  width: 100%;
  color: ${(props) =>
    props.isactive == "true"
      ? props.theme.colors.secondary
      : props.theme.colors.text};

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const ButtonUser = styled.button`
  width: 100%;
  color: ${(props) => props.theme.colors.text};

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const ImageUser = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

export const MenuBurger = styled.span<Theme>`
  background-image: ${(props) =>
    props.themeAtive
      ? "url(https://www.svgrepo.com/show/421558/burger-menu.svg)"
      : ""};
`;

export const UserList = styled.li`
  &:hover {
    background: ${(props) => shade(0.2, props.theme.colors.backgroundNavbar)};
  }
`;

export const UserLink = styled(Link)`
  width: 100%;
  color: ${(props) => props.theme.colors.text};

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;
