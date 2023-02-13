import { BrowserRouter } from "react-router-dom";
import { DefaultTheme, ThemeProvider } from "styled-components";
import Header from "./components/Header";
import { Router } from "./router/Router";
import GloBalStyle from "./styles/global";
import dark from "./styles/themes/dark";
import light from "./styles/themes/light";
import usePersistedState from "./utils/usePersistedState";

function App() {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GloBalStyle />
        <Header toggleTheme={toggleTheme} />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
