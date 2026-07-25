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
      <div className="mb-4 flex max-h-12 w-full items-center justify-center border-b border-border-default bg-surface p-2">
        <h2 className="text-xl font-medium text-brand ">ZenMind</h2>
      </div>
      <h3 className="text-lg font-semibold text-text">
        You're not signed in.
      </h3>
      <p className="mt-3 max-w-xs text-sm text-text-soft">
        Sign in to sync your focus sessions, analytics and settings.
      </p>

      <button
        onClick={openSignIn}
        className="mt-6 inline-flex items-center rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-text-inverse transition-all hover:scale-105 hover:bg-brand-muted"
      >
        Sign In
      </button>
    </div>
  );
}

export default UnauthenticatedPopup;
