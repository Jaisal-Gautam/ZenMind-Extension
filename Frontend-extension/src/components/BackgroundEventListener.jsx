import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { stopFocus } from "@/app/slices/focus/focusSlice";

import { loadFocusHistory } from "@/app/slices/focus/focusThunk";
import {  loadOverview,
  loadFocusAnalytics,
  loadWebsiteAnalytics,
  loadHistoryAnalytics, } from "@/app/slices/analytic/analyticThunk";

function BackgroundEventListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = (message) => {
      switch (message.type) {
        case "FOCUS_SESSION_COMPLETED":
          dispatch(stopFocus());

          dispatch(loadOverview());
          dispatch(loadFocusAnalytics());
          dispatch(loadWebsiteAnalytics());
          dispatch(loadHistoryAnalytics());
          dispatch(loadFocusHistory());

          break;

        default:
          break;
      }
    };

    chrome.runtime.onMessage.addListener(listener);

    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, [dispatch]);

  return null;
}

export default BackgroundEventListener;