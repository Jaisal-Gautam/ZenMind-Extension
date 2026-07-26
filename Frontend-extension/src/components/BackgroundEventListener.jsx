import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { stopFocus } from "@/app/slices/focus/focusSlice";

import { loadFocusHistory } from "@/app/slices/focus/focusThunk";

import { loadDashboard } from "@/api/dashboard.api";
function BackgroundEventListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = (message) => {
      switch (message.type) {
        case "FOCUS_SESSION_COMPLETED":
          dispatch(stopFocus());

          dispatch(loadDashboard());
          
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