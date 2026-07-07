import { useDispatch } from "react-redux";
import { addFocusSession } from "@/app/slices/analyticsSlice";
import { stopFocus } from "@/app/slices/focusSlice";
function BackgroundEventListener() {
  const dispatch = useDispatch();
  useEffect(() => {
    const listener = (message) => {
      switch (message.type) {
        case "FOCUS_SESSION_COMPLETED":
          dispatch(addFocusSession(message.session));
          dispatch(stopFocus());
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
