import Focus from "../models/focus.js";
import BlockedAttempt from "../models/blockedAttemps.js";
import WebsiteSession from "../models/websiteSession.js";
import { formatLabel, formatHour, getDateKey } from "../utils/date.js";

export const getOverview = async (userId) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);

  const [focusStats, blockedStats, completedSessions] = await Promise.all([
    Focus.aggregate([
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
    ]),

    BlockedAttempt.aggregate([
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
    ]),

    Focus.find({
      user: userId,
      completed: true,
    })
      .select("startTime")
      .sort({ startTime: -1 }),
  ]);

  const focus = focusStats[0] || {
    focusSessions: 0,
    focusedTime: 0,
  };

  const blocked = blockedStats[0] || {
    blockedAttempts: 0,
  };

  const focusDays = new Set(
    completedSessions.map((session) => getDateKey(session.startTime))
  );

  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (!focusDays.has(getDateKey(currentDate))) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  let streak = 0;

  while (focusDays.has(getDateKey(currentDate))) {
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
    0
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
  const [focusStats, peakHourStats] = await Promise.all([
    Focus.aggregate([
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
    ]),

    Focus.aggregate([
      {
        $match: {
          user: userId,
          completed: true,
        },
      },
      {
        $group: {
          _id: {
            $hour: "$startTime",
          },
          sessions: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          sessions: -1,
        },
      },
      {
        $limit: 1,
      },
    ]),
  ]);

  const focus = focusStats[0] || {
    longestSession: 0,
    averageSession: 0,
    totalFocusTime: 0,
  };

  const peakHour = peakHourStats[0] || { _id: null };

  return {
    longestSession: focus.longestSession,
    averageSession: Math.round(focus.averageSession || 0),
    totalFocusTime: focus.totalFocusTime,
    peakFocusHour: peakHour._id === null
      ? null
      : {
          hour: peakHour._id,
          label: formatHour(peakHour._id),
        },
  };
};

export const getHistory = async (userId, range) => {
  const daysMap = {
    daily: 1,
    weekly: 7,
  };

  const days = daysMap[range];

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - (days - 1));

  const history = await Focus.aggregate([
    {
      $match: {
        user: userId,
        completed: true,
        startTime: {
          $gte: startDate,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$startTime",
          },
        },
        focusTime: {
          $sum: "$actualDuration",
        },
        sessions: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  const historyMap = new Map(
    history.map((day) => [
      day._id,
      {
        focusTime: day.focusTime,
        sessions: day.sessions,
      },
    ])
  );

  const result = [];

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const dateKey = getDateKey(currentDate);
    const dayData = historyMap.get(dateKey);

    result.push({
      date: dateKey,
      label: formatLabel(currentDate, range),
      focusTime: dayData?.focusTime ?? 0,
      sessions: dayData?.sessions ?? 0,
    });
  }

  return result;
};