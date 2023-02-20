import { rgba, shade } from "polished";
import styled from "styled-components";

export const Button = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: none;
  padding: 10px;
  border-radius: 2px;
  background: ${(props) => rgba(props.theme.colors.primary, 0.8)};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${(props) => shade(0.2, props.theme.colors.secondary)};
  }

  &.show {
    display: block;
  }
`;

export const Icon = styled.i`
  font-size: 15px;
  color: #f4f4f4f4;
`;
