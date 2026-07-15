import React from "react";
import Header from "@/components/ui/Header";
import PopupContent from "./PopupContent";
import UnauthenticatedPopup from "./UnauthenticatedPopup";
import { useSelector } from "react-redux";
function Popup() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <UnauthenticatedPopup />;
  }

  return (
    <>
      <Header />
      <PopupContent />
    </>
  );
}

export default Popup;
