import { configureStore } from "@reduxjs/toolkit";
import { removeData } from "@/utils/chromeStorage";
import { getData, setData } from "@/utils/chromeStorage";
import { DefaultState } from "@/utils/constants";

import authReducer from "./slices/auth/authSlice";
import focusReducer from "./slices/focus/focusSlice";
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
        persistedState?.music?.currentTrack ?? DefaultState.music.currentTrack,
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

  store.subscribe(async () => {
  const state = store.getState();

  if (!state.auth.isAuthenticated) {
    await removeData();
    return;
  }

  const { auth, ...persistedState } = state;
  await setData(persistedState);
});

  return store;
};
