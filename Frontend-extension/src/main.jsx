import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Storeprovider from "./app/provider";
import { HashRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Storeprovider>
      <HashRouter>
        <App />
      </HashRouter>
    </Storeprovider>
  </StrictMode>,
);
