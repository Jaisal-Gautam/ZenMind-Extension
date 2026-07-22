import apiClient from "./apiClient";

export const websiteApi = {
  async createWebsiteSession(session) {
    const payload = {
      ...session,
      startTime: new Date(session.startTime).toISOString(),
      endTime: new Date(session.endTime).toISOString(),
    };
    const { data } = await apiClient.post("/website/session", payload);
    return data.websiteSession;
  },

  async createBlockedAttempt(attempt) {
    const payload = {
      ...attempt,
      blockedAt: new Date(attempt.blockedAt).toISOString(),
    };
    const { data } = await apiClient.post("/blocked/attempt", payload);
    return data.blockedAttempt;
  },
};