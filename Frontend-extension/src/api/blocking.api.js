import apiClient from "./apiClient";

export const blockingApi = {
  async getBlockingConfig() {
    const response = await apiClient.get("/blocking");
    return response.data;
  },

  async updateBlockingSettings(data) {
    const response = await apiClient.patch("/blocking", data);
    return response.data;
  },

  async addSite(data) {
    const response = await apiClient.post("/blocking/site", data);
    return response.data;
  },

  async removeSite(data) {
    const response = await apiClient.delete("/blocking/site", {
      data,
    });

    return response.data;
  },

  async addCategory(data) {
    const response = await apiClient.post("/blocking/category", data);
    return response.data;
  },

  async removeCategory(data) {
    const response = await apiClient.delete("/blocking/category", {
      data,
    });

    return response.data;
  },

  async addUnlock(data) {
    const response = await apiClient.post("/blocking/unlock", data);
    return response.data;
  },

  async removeUnlock(data) {
    const response = await apiClient.delete("/blocking/unlock", {
      data,
    });

    return response.data;
  },
};