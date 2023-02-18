import { shade } from "polished";
import styled from "styled-components";

export const Tittle = styled.div`
  font-size: 2rem;
  line-height: 1em;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

export const Button = styled.button`
  align-items: center;
  background-clip: padding-box;
  background-color: ${(props) => props.theme.colors.secondary};
  border: 1px solid transparent;
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
  &:hover {
    background-color: ${(props) => shade(0.2, props.theme.colors.secondary)};
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    transform: translateY(-1px);
  }
  &:focus {
    background-color: ${(props) => shade(0.5, props.theme.colors.secondary)};
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }
  &:active {
    background-color: ${(props) => shade(0.7, props.theme.colors.secondary)};
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    transform: translateY(0);
  }
`;
