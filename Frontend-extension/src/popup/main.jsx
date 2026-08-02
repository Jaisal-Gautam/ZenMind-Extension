import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import Storeprovider from "@/app/provider";
import Popup from "./Popup";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="w-80 bg-page text-text">
        <Storeprovider>
          <Popup />
        </Storeprovider>
      </div>

    </ThemeProvider>
  </StrictMode>
);
