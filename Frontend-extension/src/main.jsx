import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Storeprovider from "./app/provider";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <Storeprovider>
      <HashRouter>
        <App />
      </HashRouter>
    </Storeprovider>
   </ThemeProvider>
  </StrictMode>,
);
