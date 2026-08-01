import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@/api/auth.api";
import {
  setAuth,
  getAuth,
  removeAuth,
  removeData,
} from "@/utils/chromeStorage";
import { parseApiError } from "@/utils/apiError";
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
    } catch (error) {
      return rejectWithValue(
        parseApiError(error, "Login failed.")
      );
    }
  },
);
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);

      return response.user;
    } catch (error) {
      return rejectWithValue(
        parseApiError(error, "Registeration failed.")
      );
    }
  },
);

export const loadCurrentUser = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    const auth = await getAuth();
    console.log(auth)
    if (!auth) {
      return null;
    }

    try {
      const response = await authApi.me();

      console.log("Response:", response);
      console.log("Returning:", response.user);
      return response.user;
    } catch (err) {
      if (err.response?.status === 401) {
        await removeAuth();
        return null;
      }
      return rejectWithValue(
        parseApiError(err, "Load Current User failed.")
      );
    }
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
        parseApiError(err, "Login failed.")
      );
    }
  },
);
