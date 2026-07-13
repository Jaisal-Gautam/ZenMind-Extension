import BlockedAttempt from "../models/blockedAttemps.js";
import { ApiError } from "../utils/apiError.js";

export const createBlockedAttempt = async (userId, domain, mode, blockedAt) => {
  
  const blockedAttempt = await BlockedAttempt.create({
    user: userId,
    domain,
    mode,
    blockedAt,
  });
  return blockedAttempt;
};

export const getBlockedHistory = async (userId, page = 1, limit = 20) => {
  const blockedAttempt = await BlockedAttempt.find({
    user: userId,
  })
    .sort({ blockedAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalBlockedAttempt = await BlockedAttempt.countDocuments({
    user: userId,
  });
  return {
    blockedAttempt,
    totalBlockedAttempt,
    currentPage: page,
    totalPages: Math.ceil(totalBlockedAttempt / limit),
  };
};
