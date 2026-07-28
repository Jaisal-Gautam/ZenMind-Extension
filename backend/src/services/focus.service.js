import Focus from "../models/focus.js";
import { ApiError } from "../utils/apiError.js";

const closeActiveSession = async (userId, status) => {
  const session = await Focus.findOne({
    user: userId,
    status: "active",
  });

  if (!session) return null;

  const now = new Date();

  if (!session.isPaused && session.lastResumedAt) {
    session.actualDuration += Math.floor(
      (now - session.lastResumedAt) / 1000
    );
  }

  session.endTime = now;
  session.status = status;
  session.isPaused = true;
  session.lastResumedAt = null;

  await session.save();

  return session;
};

export const startFocusSession = async (userId, plannedDuration) => {
  await closeActiveSession(userId, "restarted");

  const now = new Date();

  return await Focus.create({
    user: userId,
    startTime: now,
    plannedDuration,
    actualDuration: 0,
    lastResumedAt: now,
    isPaused: false,
    status: "active",
  });
};

export const pauseFocusSession = async (userId) => {
  const session = await Focus.findOne({
    user: userId,
    status: "active",
  });

  if (!session) {
    throw new ApiError(404, "No active focus session.");
  }

  if (session.isPaused) {
    return session;
  }

  const now = new Date();

  session.actualDuration += Math.floor(
    (now - session.lastResumedAt) / 1000
  );

  session.isPaused = true;
  session.lastResumedAt = null;

  await session.save();

  return session;
};

export const resumeFocusSession = async (userId) => {
  const session = await Focus.findOne({
    user: userId,
    status: "active",
  });

  if (!session) {
    throw new ApiError(404, "No active focus session.");
  }

  if (!session.isPaused) {
    return session;
  }

  session.isPaused = false;
  session.lastResumedAt = new Date();

  await session.save();

  return session;
};

export const endFocusSession = async (userId, status) => {
  const session = await Focus.findOne({
    user: userId,
    status: "active",
  });

  if (!session) {
    throw new ApiError(404, "No active focus session.");
  }

  const now = new Date();

  if (!session.isPaused && session.lastResumedAt) {
    session.actualDuration += Math.floor(
      (now - session.lastResumedAt) / 1000
    );
  }

  session.endTime = now;
  session.status = status;
  session.isPaused = true;
  session.lastResumedAt = null;

  await session.save();

  return session;
};

export const getFocusHistory = async (
  userId,
  page = 1,
  limit = 20
) => {
  const focusSessions = await Focus.find({ user: userId })
    .sort({ startTime: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalSessions = await Focus.countDocuments({
    user: userId,
  });

  return {
    focusSessions,
    totalSessions,
    currentPage: page,
    totalPages: Math.ceil(totalSessions / limit),
  };
};

export const getCurrentFocusSession = async (userId) => {
  return await Focus.findOne({
    user: userId,
    status: "active",
  });
};