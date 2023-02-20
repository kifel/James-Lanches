import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.footer`
  height: 100%;
  background: ${(props) => shade(0, props.theme.colors.background)};
  color: ${(props) => shade(0.5, props.theme.colors.text)};
  border-top: 1px solid ${(props) => props.theme.colors.backgroundNavbar};
  box-shadow: 0px -1px 0px ${(props) => shade(0.19, props.theme.colors.background)};
`;

export const Links = styled.a`
  color: ${(props) => shade(0.5, props.theme.colors.text)};
`;
