import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import Storeprovider from "@/app/provider";
import Popup from "./Popup";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="w-80 max-w-md mx-auto bg-neutral-tertiary border border-gray-200 shadow-sm max-h-200 rounded-2xl">
      <Storeprovider>
        <Popup />
      </Storeprovider>
    </div>
  </StrictMode>
);
