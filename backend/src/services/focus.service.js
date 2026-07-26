import Focus from "../models/focus.js";
import { ApiError } from "../utils/apiError.js";

export const startFocusSession = async (userId, plannedDuration) => {
  const prevFocus = await Focus.findOne({
    user: userId,
    completed: false,
    endTime: null,
  });

  if (prevFocus) {
    throw new ApiError(409, "Focus session already running.");
  }

  const focus = await Focus.create({
    user: userId,
    startTime: new Date(),
    plannedDuration,
  });
  return focus;
};

export const endFocusSession = async (userId, endReason) => {
  const FocusSession = await Focus.findOne({
    user: userId,
    completed: false,
    endTime: null,
  });

  if (!FocusSession) {
    throw new ApiError(404, "No Active Focus session .");
  }
  FocusSession.endTime = new Date();
  FocusSession.actualDuration =
    ((FocusSession.endTime - FocusSession.startTime) / 1000 );

  FocusSession.completed = endReason === "completed";

  FocusSession.endReason = endReason;
  await FocusSession.save();
  return FocusSession;
};

export const getFocusHistory = async (userId, page = 1, limit = 20) => {
  const focusSessions = await Focus.find({
    user: userId,
  })
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

export const getCurrentFocusSession=async (userId)=>{
   const focusSessions = await Focus.findOne({
    user:userId,
        completed: false,
    endTime: null
  });
  return focusSessions;
}
