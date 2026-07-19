import Focus from "../models/focus.js";
import BlockedAttempt from "../models/blockedAttemps.js";
import WebsiteSession from "../models/websiteSession.js";

export const getOverview = async (userId) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);

  const focusStats = await Focus.aggregate([
    {
      $match: {
        user: userId,
        completed: true,
        startTime: {
          $gte: todayStart,
          $lt: tomorrowStart,
        },
      },
    },
    {
      $group: {
        _id: null,
        focusSessions: { $sum: 1 },
        focusedTime: { $sum: "$actualDuration" },
      },
    },
  ]);

  const blockedStats = await BlockedAttempt.aggregate([
    {
      $match: {
        user: userId,
        blockedAt: {
          $gte: todayStart,
          $lt: tomorrowStart,
        },
      },
    },
    {
      $group: {
        _id: null,
        blockedAttempts: { $sum: 1 },
      },
    },
  ]);

  const focus = focusStats[0] || {
    focusSessions: 0,
    focusedTime: 0,
  };

  const blocked = blockedStats[0] || {
    blockedAttempts: 0,
  };

  const completedSessions = await Focus.find({
    user: userId,
    completed: true,
  })
    .select("startTime")
    .sort({ startTime: -1 });

  // Store unique focus days
  const focusDays = new Set(
    completedSessions.map(
      (session) => session.startTime.toISOString().split("T")[0],
    ),
  );

  // Start from today
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // If no focus today, start from yesterday
  const todayKey = currentDate.toISOString().split("T")[0];

  if (!focusDays.has(todayKey)) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  let streak = 0;

  while (true) {
    const dateKey = currentDate.toISOString().split("T")[0];

    if (!focusDays.has(dateKey)) {
      break;
    }

    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }
  return {
    focusedTime: focus.focusedTime,
    focusSessions: focus.focusSessions,
    blockedAttempts: blocked.blockedAttempts,
    streak,
  };
};

export const getWebsiteAnalytics = async (userId) => {
  const websiteStats = await WebsiteSession.aggregate([
    {
      $match: {
        user: userId,
      },
    },
    {
      $group: {
        _id: "$domain",
        duration: { $sum: "$duration" },
        sessions: { $sum: 1 },
      },
    },
    {
      $sort: {
        duration: -1,
      },
    },
    {
      $limit: 10,
    },
  ]);
  const totalDuration = websiteStats.reduce(
    (sum, site) => sum + site.duration,
    0,
  );
  return websiteStats.map((stat) => ({
    domain: stat._id,
    duration: stat.duration,
    sessions: stat.sessions,
    percentage:
      totalDuration === 0
        ? 0
        : Number(((stat.duration / totalDuration) * 100).toFixed(1)),
  }));
};

export const getFocusAnalytics = async (userId) => {
  const focusStats = await Focus.aggregate([
    {
      $match: {
        user: userId,
        completed: true,
      },
    },
    {
      $group: {
        _id: null,
        longestSession: { $max: "$actualDuration" },
        averageSession: { $avg: "$actualDuration" },
        totalFocusTime: { $sum: "$actualDuration" },
      },
    },
  ]);
  const peakHourStats = await Focus.aggregate([
    {
      $match: {
        user: userId,
        completed: true,
      },
    },
    {
      $group: {
        _id: { $hour: { date: "$startTime" } },
        sessions: { $sum: 1 },
      },
    },
    {
      $sort: { sessions: -1 },
    },
    {
      $limit: 1,
    },
  ]);

  const focus = focusStats[0] || {
    longestSession: 0,
    averageSession: 0,
    totalFocusTime: 0,
  };
  const peakHour = peakHourStats[0] || { _id: null };
  return {
    longestSession: focus.longestSession,
    averageSession: Math.round(Number((focus.averageSession || 0)).toFixed(1)),
    totalFocusTime: focus.totalFocusTime,
    peakFocusHour: peakhour._id,
  };
};
