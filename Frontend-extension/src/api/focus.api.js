import apiClient from "./apiClient";
export const focusApi = {
  async startFocus(plannedDuration) {
    const response = await apiClient.post("/focus/start", { plannedDuration });
    return response.data;
  },
  async endFocus(endReason) {
    const response = await apiClient.post("/focus/end", { endReason });
    return response.data;
  },
  async getHistory(page, limit) {
    const response = await apiClient.get("/focus/history", {
      params: { page, limit },
    });
    return response.data;
  },
  async getCurrentFocus(){
    const response=await apiClient.get("/focus/current");
    return response.data;
  }
};
