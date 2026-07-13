import WebsiteSession from "../models/websiteSession.js";
import { ApiError } from "../utils/apiError.js";
export const createWebsiteSession = async (
  userId,
  domain,
  startTime,
  endTime,
  duration,
) => {
  const session = await WebsiteSession.create({
    user:userId,
    domain,
    startTime,
    endTime,
    duration,
  });
  return session;
};

export const getWebsiteHistory = async (userId, page = 1, limit = 20) => {
  const websiteSessions = await WebsiteSession.find({
    user: userId,
  })
    .sort({ startTime: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalWebsiteSessions = await WebsiteSession.countDocuments({
    user: userId,
  });
  return {
    websiteSessions,
    totalWebsiteSessions,
    currentPage: page,
    totalPages: Math.ceil(totalWebsiteSessions / limit),
  };
};
