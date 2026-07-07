import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Storeprovider from "@/app/provider";
import { useSelector } from "react-redux";
import NormalMode from "./NormalMode";
import DeepFocus from "./DeepMode";
import Strict from "./StrictMode";
import "../../index.css"
function BlockedPage() {
  const mode = useSelector((state) => state.blocking.activeMode);
  if(mode=="Normal") return <NormalMode/>
  else if(mode=="Deep Focus") return <DeepFocus/>
  else return <Strict/>
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Storeprovider>
      <BlockedPage />
    </Storeprovider>
  </StrictMode>
);
