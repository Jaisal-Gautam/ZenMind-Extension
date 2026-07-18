import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createAppStore } from "./store";
import { loadCurrentUser } from "./slices/auth/authThunk";
import { loadPreferences } from "./slices/setting/settingsThunk";
import { setDuration } from "./slices/focus/focusSlice";
import { initializeMusic } from "./slices/musicSlice";
import { loadBlockingConfig } from "./slices/blocking/blockingThunk";
import {
  loadOverview,
  loadFocusAnalytics,
  loadWebsiteAnalytics,
} from "./slices/analytic/analyticThunk";
function StoreProvider({ children }) {
  const [store, setStore] = useState(null);
  useEffect(() => {
    const initStore = async () => {
      const appStore = await createAppStore();

      try {
        const currUser = await appStore.dispatch(loadCurrentUser()).unwrap();

        if (currUser) {
          await appStore.dispatch(loadPreferences()).unwrap();
          await appStore.dispatch(loadBlockingConfig()).unwrap();
          await appStore.dispatch(loadOverview()).unwrap();
          await appStore.dispatch(loadWebsiteAnalytics()).unwrap();
          await appStore.dispatch(loadFocusAnalytics()).unwrap();
          const { focus, settings } = appStore.getState();

          if (!focus.isActive && !focus.isPaused) {
            appStore.dispatch(setDuration(settings.defaultFocusDuration));
          }

          appStore.dispatch(
            initializeMusic({
              trackId: settings.defaultMusic,
              volume: settings.defaultMusicVolume,
              isLooping: settings.musicLoop,
            }),
          );
        }
      } catch (err) {
        console.log("Session restore skipped:", err);
      } finally {
        setStore(appStore);
      }
    };

    initStore();
  }, []);

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
