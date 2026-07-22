import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@/api/auth.api";
import { setAuth, getAuth, removeAuth,removeData } from "@/utils/chromeStorage";
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);

      await setAuth({
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });

      return response.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);

      return response.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const loadCurrentUser = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    if (!(await getAuth())) {
      return rejectWithValue("Not authenticated");
    }
    const response = await authApi.me();
    return response.user;
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      await removeData();
      await removeAuth();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Logout failed",
      );
    }
  },
);
