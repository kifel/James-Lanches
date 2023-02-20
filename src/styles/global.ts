import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-family : Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke: 0.45px rgba(255, 255, 255, 0.1);
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar {
    width: 6px
  }

  ::-webkit-scrollbar-track {
    background: #cececece;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
  }

  body {
    background: ${(props) => props.theme.colors.background};
    font-size: 14px;
    color: ${(props) => props.theme.colors.text};
  }

`;
