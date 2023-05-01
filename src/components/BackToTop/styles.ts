import { rgba, shade } from "polished";
import styled from "styled-components";

export const Button = styled.button`
	position: fixed;
	bottom: 110px;
	right: 30px;
	display: none;
	width: 25px;
	height: 25px;
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
  font-size: 18px;
  color: #f4f4f4f4;
`;
