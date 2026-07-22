import apiClient from "./apiClient";
export const analyticApi = {
  async getOverview() {
    const response = await apiClient.get("/analytics/overview");
    return {
      overview:response.data.overview,
      lifetime:response.data.lifetime

    }
  },
  async webAnalytics() {
    const response = await apiClient.get("/analytics/websites");
    return {
      websiteAnalytics: response.data.websiteAnalytics,
      blockedWebsiteAnalytics: response.data.blockedWebsiteAnalytics,
    };
  },
  async focusAnalytics() {
    const response = await apiClient.get("/analytics/focus");
    return response.data.focusAnalytics;
  },
  async getHistory(range = "daily") {
    const response = await apiClient.get("/analytics/history", {
      params: { range },
    });

    return response.data.history;
  },
};

export default analyticApi;
