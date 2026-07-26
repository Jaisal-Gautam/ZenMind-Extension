import { configureStore } from "@reduxjs/toolkit";
import {
  removeData,
  getData,
  setData,
  STORAGE_KEY,
} from "@/utils/chromeStorage";
import { DefaultState } from "@/utils/constants";

import authReducer from "./slices/auth/authSlice";
import focusReducer, {
  syncFocusState,
} from "./slices/focus/focusSlice";
import blockingReducer from "./slices/blocking/blockingSlice";
import analyticsReducer from "./slices/analytic/analyticsSlice";
import settingsReducer from "./slices/setting/settingsSlice";
import musicReducer from "./slices/musicSlice";

export const createAppStore = async () => {
  const persistedState = await getData();

  const preloadedState = {
    auth: DefaultState.auth,

    focus: {
      ...DefaultState.focus,
      ...persistedState?.focus,
    },

    blocking: {
      ...DefaultState.blocking,
      ...persistedState?.blocking,
    },

    analytics: {
      ...DefaultState.analytics,
      ...persistedState?.analytics,
    },

    settings: {
      ...DefaultState.settings,
      ...persistedState?.settings,
    },

    music: {
      ...DefaultState.music,
      ...persistedState?.music,
      currentTrack:
        persistedState?.music?.currentTrack ??
        DefaultState.music.currentTrack,
    },
  };

  const store = configureStore({
    reducer: {
      auth: authReducer,
      focus: focusReducer,
      blocking: blockingReducer,
      analytics: analyticsReducer,
      settings: settingsReducer,
      music: musicReducer,
    },
    preloadedState,
  });

  let isSyncingFromStorage = false;

  store.subscribe(async () => {
    if (isSyncingFromStorage) return;

    const state = store.getState();

    if (!state.auth.isAuthenticated) {
      await removeData();
      return;
    }

    const { auth, ...persistedState } = state;
    await setData(persistedState);
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;

    const change = changes[STORAGE_KEY];

    // Ignore unrelated storage changes
    if (!change) return;

    // Happens when STORAGE_KEY is removed (logout)
    if (!change.newValue) return;

    isSyncingFromStorage = true;

    try {
      const newState = JSON.parse(change.newValue);

      // Prevent unnecessary dispatches
      const currentFocus = store.getState().focus;

      if (
        JSON.stringify(currentFocus) !==
        JSON.stringify(newState.focus)
      ) {
        store.dispatch(syncFocusState(newState.focus));
      }
    } catch (error) {
      console.error("Failed to sync state:", error);
    } finally {
      isSyncingFromStorage = false;
    }
  });

  return store;
};