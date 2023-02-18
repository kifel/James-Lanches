import { shade } from "polished";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Card = styled.div`
  box-shadow: ${(props) => shade(0.19, props.theme.colors.background)} 0px
      10px 20px,
    ${(props) => shade(0.23, props.theme.colors.background)} 0px 6px 6px;
  background: ${(props) => props.theme.colors.backgroundNavbar};

  &:hover {
    background: ${(props) => shade(0.2, props.theme.colors.backgroundNavbar)};
  }
`;

export const LinkStyles = styled(Link)`
  color: ${(props) => props.theme.colors.text};
  width: 500px;
  text-decoration: none;
`;

export const Price = styled.small`
  color: ${(props) => shade(0.4, props.theme.colors.text)};
`;
