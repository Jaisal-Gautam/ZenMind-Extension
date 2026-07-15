import React from "react";

function UnauthenticatedPopup() {
  const openSignIn = () => {
    try {
      const baseUrl = chrome.runtime.getURL("index.html");
      const url = `${baseUrl}#/auth/login`;
      chrome.tabs.create({ url });
    } catch (err) {
      window.open("/#/auth/login", "_blank");
    }
  };

  return (
    <div className="p-6 flex min-h-48 w-full flex-col items-center justify-center text-center">
      <div className="flex justify-center mb-4 items-center w-full max-h-12 p-2 bg-white border-b-2 border-gray-200 ">
        <h2 className="text-xl font-medium text-green-primary ">ZenMind</h2>
      </div>
      <h3 className="text-lg font-semibold text-green-primary">
        You're not signed in.
      </h3>
      <p className="mt-3 max-w-xs text-sm text-gray-500">
        Sign in to sync your focus sessions, analytics and settings.
      </p>

      <button
        onClick={openSignIn}
        className="mt-6 inline-flex items-center rounded-lg bg-green-primary  px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:opacity-95 hover:bg-green-secondary"
      >
        Sign In
      </button>
    </div>
  );
}

export default UnauthenticatedPopup;
