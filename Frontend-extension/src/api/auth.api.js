import axios from "axios";
import apiClient from "./apiClient";
const baseURL = import.meta.env.VITE_BACKEND_URL;
export const authApi = {
  async register(userData) {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  async login(credentials) {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  async me() {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  async logout() {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  async changePassword(passwords) {
    const response = await apiClient.patch("/auth/change-password", passwords);
    return response.data;
  },

  async forgotPassword(email) {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  },

  async resetPassword(resetData) {
    const response = await apiClient.post("/auth/reset-password", resetData);
    return response.data;
  },

  async refresh(refreshToken) {
    const response = await axios.post(`${baseURL}/auth/refresh`, {
      refreshToken:refreshToken,
    });
    return response.data;
  },
  async verifyResetOtp(email, otp) {
  const response = await apiClient.post(
    "/auth/verify-reset-otp",
    {
      email,
      otp,
    }
  );
  return response.data;
},
};
