import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createAppStore } from "./store";
import { loadCurrentUser } from "./slices/auth/authThunk";
import {   setDuration } from "./slices/focus/focusSlice";
import { initializeMusic } from "./slices/musicSlice";
import { loadBlockingConfig } from "./slices/blocking/blockingThunk";

import BackgroundEventListener from "@/components/BackgroundEventListener";
import DayChangeListener from "@/components/ui/DayChangeListener";
import Loader from "@/components/Loader";
import { loadDashboard } from "@/api/dashboard.api";
import { loadCurrentFocusSession } from "./slices/focus/focusThunk";
function StoreProvider({ children }) {
  const [store, setStore] = useState(null);
  useEffect(() => {
    const initStore = async () => {
      const appStore = await createAppStore();

      try {
        const currUser = await appStore.dispatch(loadCurrentUser()).unwrap();

        if (currUser) {
          await Promise.all([
            appStore.dispatch(loadBlockingConfig()).unwrap(),
            appStore.dispatch(loadDashboard()).unwrap(),
            appStore.dispatch(loadCurrentFocusSession()).unwrap(),
          ]);
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
        
        console.error("Session restore failed:", err);
      } finally {
        setStore(appStore);
      }
    };

    initStore();
  }, []);

  if (!store) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <BackgroundEventListener />
      <DayChangeListener />
      {children}
    </Provider>
  );
}

export default StoreProvider;
