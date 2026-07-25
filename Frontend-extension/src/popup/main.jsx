import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import Storeprovider from "@/app/provider";
import Popup from "./Popup";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <div className="mx-auto h-200 w-80 max-w-md rounded-2xl border border-border-default bg-page text-text shadow-sm scroll-smooth">
      <Storeprovider>
        <Popup />
      </Storeprovider>
    </div>

    </ThemeProvider>
  </StrictMode>
);
