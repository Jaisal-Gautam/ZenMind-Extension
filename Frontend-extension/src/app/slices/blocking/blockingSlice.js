import { createSlice } from "@reduxjs/toolkit";
import parseDomain from "@/utils/siteParser";
import {
  loadBlockingConfig,
  createBlockedSite,
  removeBlockedSite,
  updateBlockingSettings,
  addBlockedCategory,
  removeBlockedCategory,
} from "./blockingThunk";

const initialState = {
  guardEnabled: false,
  activeMode: "Normal",
  blockedSites: [],
  deepFocusSites: [],
  strictWhitelist: [],
  blockedCategories: [],

  loading: false,
  error: null,
};
const pending = (state) => {
  state.loading = true;
  state.error = null;
};

const fulfilled = (state, action) => {
  state.loading = false;
  state.error = null;

  hydrateBlocking(state, action.payload);
};

const rejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const hydrateBlocking = (state, blocking) => {
  state.guardEnabled = blocking.guardEnabled;
  state.activeMode = blocking.activeMode;

  state.blockedSites = (blocking.normal ?? []).map(site => site.domain);
  state.deepFocusSites = (blocking.deep ?? []).map(site => site.domain);
  state.strictWhitelist = (blocking.strict ?? []).map(site => site.domain);

  state.blockedCategories = blocking.blockedCategories;
  state.temporaryUnlocks = blocking.tempUnlock ?? [];
};

const blockingSlice = createSlice({
  name: "blocking",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBlockingConfig.pending, pending)
      .addCase(loadBlockingConfig.fulfilled, fulfilled)
      .addCase(loadBlockingConfig.rejected, rejected)

      .addCase(createBlockedSite.pending, pending)
      .addCase(createBlockedSite.fulfilled, fulfilled)
      .addCase(createBlockedSite.rejected, rejected)

      .addCase(removeBlockedSite.pending, pending)
      .addCase(removeBlockedSite.fulfilled, fulfilled)
      .addCase(removeBlockedSite.rejected, rejected)

      .addCase(updateBlockingSettings.pending, pending)
      .addCase(updateBlockingSettings.fulfilled, fulfilled)
      .addCase(updateBlockingSettings.rejected, rejected)

      .addCase(addBlockedCategory.pending, pending)
      .addCase(addBlockedCategory.fulfilled, fulfilled)
      .addCase(addBlockedCategory.rejected, rejected)

      .addCase(removeBlockedCategory.pending, pending)
      .addCase(removeBlockedCategory.fulfilled, fulfilled)
      .addCase(removeBlockedCategory.rejected, rejected)
  },
});


export default blockingSlice.reducer;
