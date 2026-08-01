import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  loadCurrentUser,
  logoutUser,
} from "./authThunk";
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  initialized: false,
  fieldErrors: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutLocal: (state) => {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      state.initialized = true;
      state.fieldErrors = {};
    },
    clearErrors(state) {
      state.error = null;
      state.fieldErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.fieldErrors = {};
        state.initialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message;
        state.fieldErrors = action.payload?.fieldErrors || {};
        state.initialized = true;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })

      //Current User
      .addCase(loadCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        console.log("Payload:", action.payload);
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.error = null;
        state.fieldErrors = {};
        state.initialized = true;
      })
      .addCase(loadCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message;
        state.fieldErrors = action.payload?.fieldErrors || {};
        state.initialized = true;
      })

      //logout User
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        state.fieldErrors = {};
        state.initialized = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
        state.fieldErrors = action.payload?.fieldErrors || {};
      });
  },
});

export const { logoutLocal, clearErrors } = authSlice.actions;

export default authSlice.reducer;
