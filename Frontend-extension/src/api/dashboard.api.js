import apiClient from "./apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const dashboardApi = {
  async getDashboard() {
    const response = await apiClient.get("/dashboard");
    return response.data;
  },
};


export const loadDashboard = createAsyncThunk(
  "dashboard/loadDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getDashboard();
      return response.dashboard;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load dashboard."
      );
    }
  }
);