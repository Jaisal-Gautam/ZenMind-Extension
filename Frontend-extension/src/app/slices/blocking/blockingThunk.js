import { blockingApi } from "@/api/blocking.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadBlockingConfig = createAsyncThunk(
  "blocking/loadConfig",
  async (_, { rejectWithValue }) => {
    try {
      const response = await blockingApi.getBlockingConfig();
      return response.blocking;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to load blocking configuration",
      );
    }
  },
);

export const createBlockedSite =createAsyncThunk(
    "blocking/addBlockedSite",
    async(data,{rejectWithValue})=>{
        try{
            const response =await blockingApi.addSite(data);
            return response.blocking;
        }catch(err){
            return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to add ",
      );
        }
    }
)
export const removeBlockedSite = createAsyncThunk(
  "blocking/removeBlockedSite",
  async (data, { rejectWithValue }) => {
    try {
      const response = await blockingApi.removeSite(data);
      return response.blocking;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to remove blocked site"
      );
    }
  }
);
export const updateBlockingSettings = createAsyncThunk(
  "blocking/updateSettings",
  async (data, { rejectWithValue }) => {
    try {
      const response =
        await blockingApi.updateBlockingSettings(data);

      return response.blocking;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to update settings"
      );
    }
  }
);

export const addBlockedCategory = createAsyncThunk(
  "blocking/addCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response =
        await blockingApi.addCategory(data);

      return response.blocking;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to add category"
      );
    }
  }
);

export const removeBlockedCategory = createAsyncThunk(
  "blocking/removeCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response =
        await blockingApi.removeCategory(data);

      return response.blocking;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to remove category"
      );
    }
  }
);

