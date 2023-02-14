import { BrowserRouter } from "react-router-dom";
import { DefaultTheme, ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import { Router } from "./router/Router";
import GloBalStyle from "./styles/global";
import dark from "./styles/themes/dark";
import light from "./styles/themes/light";
import usePersistedState from "./utils/usePersistedState";

function App() {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);

  const toggleTheme = (themeString: string) => {
    setTheme(themeString === "light" ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GloBalStyle />
        <Navbar toggleTheme={toggleTheme} />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
