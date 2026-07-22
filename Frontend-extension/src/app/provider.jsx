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
  loadHistoryAnalytics,
} from "./slices/analytic/analyticThunk";
import BackgroundEventListener from "@/components/BackgroundEventListener";
import DayChangeListener from "@/components/ui/DayChangeListener";
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
          await appStore.dispatch(loadHistoryAnalytics("daily")).unwrap();
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

  return <Provider store={store}>
      <BackgroundEventListener />
      <DayChangeListener/>
    {children}</Provider>;
}

export default StoreProvider;
