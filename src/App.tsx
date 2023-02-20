import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Theme } from "react-toastify/dist/types";
import { DefaultTheme, ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthProvider";
import { Router } from "./router/Router";
import GloBalStyle from "./styles/global";
import dark from "./styles/themes/dark";
import light from "./styles/themes/light";
import usePersistedState from "./utils/usePersistedState";

function App() {
  const [theme, setTheme] = usePersistedState<DefaultTheme>(
    "theme",
    light,
    (value: any) => {
      if (value.title && value.colors) {
        return value as DefaultTheme;
      }
      throw new Error("Invalid value");
    }
  );

  const toggleTheme = (themeString: string) => {
    setTheme(themeString === "light" ? dark : light);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GloBalStyle />
          <Navbar toggleTheme={toggleTheme} />
          <Router />
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme.title as Theme}
        />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
