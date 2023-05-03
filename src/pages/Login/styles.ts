import styled, { keyframes } from "styled-components";

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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

type ButtonProps = {
  loading?: string;
};

export const Button = styled.button<ButtonProps>`
  background: ${({ loading }) =>
    loading === "true" ? "#ccc" : "red"};
  color: ${({ loading }) => (loading === "true" ? "#333" : "#fff")};
  cursor: ${({ loading }) => (loading === "true" ? "not-allowed" : "pointer")};
  position: relative;
  width: 100%;
  height: 3em;

  &:hover {
    background: ${(props) => props.theme.colors.tertiary};
  }

  &::after {
    content: "";
    display: ${({ loading }) => (loading === "true" ? "block" : "none")};
    width: 0.9em;
    height: 0.9em;
    border-radius: 50%;
    border: 0.15em solid currentColor;
    border-top-color: transparent;
    animation: ${rotate} 0.6s linear infinite;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
