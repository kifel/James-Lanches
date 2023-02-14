import { shade } from "polished";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

interface LinkItemProps extends LinkProps {
  isactive?: string;
}

interface Props {
  isactive: string;
}

export const NavLink = styled(Link)`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  font-weight: 500;
  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const LogoColor = styled.span`
  color: ${(props) => props.theme.colors.secondary};
`;

export const LinkItemNavbar = styled(Link)<LinkItemProps>`
  color: ${(props) =>
    props.isactive == "true" ? props.theme.colors.secondary : "#ffff"};
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.5s ease;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const ThemeList = styled.li`
  &:hover {
    background: ${shade(0.5, `rgb(33,37,41)`)};
  }
`;

export const ThemeDropdown = styled.a`
  color: #f4f4f4;
  font-size: 1.1rem;
  transition: all 0.5s ease;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const ThemeButton = styled.button<Props>`
  color: ${(props) =>
    props.isactive == "true" ? props.theme.colors.secondary : "#f4f4f4"};

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;
