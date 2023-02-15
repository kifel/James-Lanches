import { shade } from "polished";
import styled from "styled-components";

export const LogionSection = styled.section`
  background-color: ${(props) => props.theme.colors.background};
`;

export const LoginContainer = styled.div`
  background-color: ${(props) => shade(0.2, props.theme.colors.tertiary)};
  color: #f4f4f4f4;
`;

export const ButtonsRows = styled.div`
  width: 100%;
  margin-top: 25px;
`;
