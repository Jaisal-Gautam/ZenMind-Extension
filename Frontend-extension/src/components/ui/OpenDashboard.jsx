import React from "react";

function OpenDashboard() {
  const openFocus = () => {
    try {
      const url = chrome.runtime.getURL("index.html");
      chrome.tabs.create({
        url,
      });
    } catch (error) {
      console.error("Failed to open dashboard:", error);
      window.open("/", "_blank");
    }
  };
  return (
    <div className="w-full flex items-center justify-center mt-3 z-0">
      <button
        className="w-full max-w-lg px-4 py-3 text-lg bg-brand hover:scale-105 transition-all duration-300 text-text rounded-md shadow-sm"
        onClick={openFocus}
      >
        Open Dashboard
      </button>
    </div>
  );
}

export default OpenDashboard;
