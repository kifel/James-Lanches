import styled from "styled-components";

export const LogionSection = styled.section`
  background-color: ${(props) => props.theme.colors.background};
`;

export const LoginContainer = styled.div`
  -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  background-color: ${(props) => props.theme.colors.backgroundNavbar};
  color: ${(props) => props.theme.colors.text};
`;

export const ButtonsRows = styled.div`
  width: 100%;
  margin-top: 25px;
`;

export const Buttons = styled.a`
  color: ${(props) => props.theme.colors.text};
`;
