import { DateTime } from "luxon";
import mongoose from "mongoose";
import Focus from "../models/focus.js";
import BlockedAttempt from "../models/blockedAttemps.js";
import WebsiteSession from "../models/websiteSession.js";
import { formatLabel, formatHour, getDateKey } from "../utils/date.js";
import { getLongestStreak, getCurrentStreak } from "../utils/streak.js";
import { getDayBounds } from "../utils/timezone.js";

const toObjectId = (userId) => new mongoose.Types.ObjectId(userId);

export const getOverview = async (user) => {
  const { _id, timezone = "UTC" } = user;
  const objectUserId = toObjectId(_id);


  const { todayStart, tomorrowStart } = getDayBounds(timezone);

  const [focusStats, blockedStats, completedSessions, mostUsed, mostBlocked] =
    await Promise.all([
      Focus.aggregate([
        {
          $match: {
            user: objectUserId,
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
            user: objectUserId,
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
        user: objectUserId,
        completed: true,
      }).select("startTime"),

      getMostUsedWebsite(user),
      getMostBlockedWebsite(user),
    ]);

  const focus = focusStats[0] || {
    focusSessions: 0,
    focusedTime: 0,
  };

  const blocked = blockedStats[0] || {
    blockedAttempts: 0,
  };

  return {
    focusedTime: focus.focusedTime,
    focusSessions: focus.focusSessions,
    blockedAttempts: blocked.blockedAttempts,

    currentStreak: getCurrentStreak(completedSessions),
    longestStreak: getLongestStreak(completedSessions),

    mostUsed,
    mostBlocked,
  };
};

export const getWebsiteAnalytics = async (user) => {
  const { _id, timezone = "UTC" } = user;
  const objectUserId = toObjectId(_id);

  const [websiteStats, blockedStats] = await Promise.all([
    WebsiteSession.aggregate([
      {
        $match: {
          user: objectUserId,
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
    ]),

    BlockedAttempt.aggregate([
      {
        $match: {
          user: objectUserId,
        },
      },
      {
        $group: {
          _id: "$domain",
          attempts: { $sum: 1 },
        },
      },
      {
        $sort: {
          attempts: -1,
        },
      },
      {
        $limit: 10,
      },
    ]),
  ]);
  const totalDuration = websiteStats.reduce(
    (sum, site) => sum + site.duration,
    0,
  );
  const websiteAnalytics = websiteStats.map((stat) => ({
    domain: stat._id,
    duration: stat.duration,
    sessions: stat.sessions,

    percentage:
      totalDuration === 0
        ? 0
        : Number(((stat.duration / totalDuration) * 100).toFixed(1)),
  }));

  const blockedWebsiteAnalytics = blockedStats.map((stat) => ({
    domain: stat._id,
    attempts: stat.attempts,
  }));

  return { websiteAnalytics, blockedWebsiteAnalytics };
};

export const getFocusAnalytics = async (user) => {
  const { _id, timezone = "UTC" } = user;
  const objectUserId = toObjectId(_id);
  const [focusStats, peakHourStats, hourlyStats] = await Promise.all([
    Focus.aggregate([
      {
        $match: {
          user: objectUserId,
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
          user: objectUserId,
          completed: true,
        },
      },
      {
        $group: {
          _id: {
            $hour: {
              date: "$startTime",
              timezone,
            },
          },
          sessions: { $sum: 1 },
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

    Focus.aggregate([
      {
        $match: {
          user: objectUserId,
          completed: true,
        },
      },
      {
        $group: {
          _id: {
            $hour: {
              date: "$startTime",
              timezone,
            },
          },
          minutes: { $sum: "$actualDuration" },
        },
      },
    ]),
  ]);

  const focus = focusStats[0] || {
    longestSession: 0,
    averageSession: 0,
    totalFocusTime: 0,
  };

  const peakHour = peakHourStats[0] || { _id: null };

  // Build complete 24-hour dataset
  const hourlyMap = new Map(
    hourlyStats.map((hour) => [hour._id, hour.minutes]),
  );

  const hourly = [];

  for (let hour = 0; hour < 24; hour++) {
    hourly.push({
      hour,
      minutes: hourlyMap.get(hour) ?? 0,
    });
  }

  return {
    longestSession: focus.longestSession,
    averageSession: Math.round(focus.averageSession || 0),
    totalFocusTime: focus.totalFocusTime,

    peakFocusHour:
      peakHour._id === null
        ? null
        : {
            hour: peakHour._id,
            label: formatHour(peakHour._id),
            minutes: hourlyMap.get(peakHour._id) ?? 0,
          },

    hourly,
  };
};

export const getHistory = async (user, range) => {
  const { _id, timezone = "UTC" } = user;
  const objectUserId = toObjectId(_id);

  const daysMap = {
    daily: 1,
    weekly: 7,
  };

  const days = daysMap[range];

  const startDate = DateTime.now()
    .setZone(timezone)
    .startOf("day")
    .minus({ days: days - 1 });

  const history = await Focus.aggregate([
    {
      $match: {
        user: objectUserId,
        completed: true,
        startTime: {
          $gte: startDate.toUTC().toJSDate(),
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$startTime",
            timezone,
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
    ]),
  );

  const result = [];

  for (let i = 0; i < days; i++) {
    const currentDate = startDate.plus({ days: i });

    const dateKey = currentDate.toFormat("yyyy-MM-dd");

    const dayData = historyMap.get(dateKey);

    result.push({
      date: dateKey,
      label: formatLabel(currentDate.toJSDate(), range),
      focusTime: dayData?.focusTime ?? 0,
      sessions: dayData?.sessions ?? 0,
    });
  }

  return result;
};

export const getMostUsedWebsite = async (user) => {
  const { _id, timezone = "UTC" } = user;
  const objectUserId = toObjectId(_id);

  const { todayStart, tomorrowStart } = getDayBounds(timezone);

  const websites = await WebsiteSession.aggregate([
    {
      $match: {
        user: objectUserId,
        startTime: {
          $gte: todayStart,
          $lt: tomorrowStart,
        },
      },
    },
    {
      $group: {
        _id: "$domain",
        totalDuration: { $sum: "$duration" },
      },
    },
    {
      $sort: {
        totalDuration: -1,
      },
    },
  ]);

  return websites.map((site) => ({
    domain: site._id,
    duration: site.totalDuration,
  }));
};

export const getMostBlockedWebsite = async (user) => {
  const { _id, timezone = "UTC" } = user;
  const objectUserId = toObjectId(_id);
  const { todayStart, tomorrowStart } =
    getDayBounds(timezone);

  const websites = await BlockedAttempt.aggregate([
    {
      $match: {
        user: objectUserId,
        blockedAt: {
          $gte: todayStart,
          $lt: tomorrowStart,
        },
      },
    },
    {
      $group: {
        _id: "$domain",
        attempts: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        attempts: -1,
      },
    },
  ]);

  return websites.map((site) => ({
    domain: site._id,
    attempts: site.attempts,
  }));
};

export const getLifetimeAnalytics = async (user) => {
  const { _id, timezone = "UTC" } = user;
  const objectUserId = toObjectId(_id);

  const [focusStats, blockedStats, completedSessions] = await Promise.all([
    Focus.aggregate([
      {
        $match: {
          user: objectUserId,
          completed: true,
        },
      },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          totalFocusTime: { $sum: "$actualDuration" },
        },
      },
    ]),

    BlockedAttempt.aggregate([
      {
        $match: {
          user: objectUserId,
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
      user: objectUserId,
      completed: true,
    }).select("startTime"),
  ]);

  const focus = focusStats[0] ?? {
    totalSessions: 0,
    totalFocusTime: 0,
  };

  const blocked = blockedStats[0] ?? {
    blockedAttempts: 0,
  };

  return {
    totalFocusTime: focus.totalFocusTime,
    totalSessions: focus.totalSessions,
    blockedAttempts: blocked.blockedAttempts,
    currentStreak: getCurrentStreak(completedSessions),
    longestStreak: getLongestStreak(completedSessions),
  };
};
