import { getData } from "./chromeStorage";
import { getTodayKey, getWeekKey, getDateKey } from "./todayDate";
export const getFocus = (analytics, period) => {
  if (period === "today") {
    const today = getTodayKey();
    return analytics.dailyFocus?.[today] || 0;
  }

  if (period === "week") {
    const week = getWeekKey();
    let total = 0;

    for (const day of week) {
      total += analytics.dailyFocus?.[day] || 0;
    }
    return total;
  }
  if(period=="all"){
    let total=0;
    for(let i=0;i<analytics.focusSessions.length;i++){
      
    }

  }

  return 0;
};

export const getBlockedAttempts = (analytics, period) => {
  if (period === "today") {
    const today = getTodayKey();
    return analytics.dailyBlockedAttempts?.[today] || 0;
  }

  if (period === "week") {
    const week = getWeekKey();
    let total = 0;

    for (const day of week) {
      total += analytics.dailyBlockedAttempts?.[day] || 0;
    }

    return total;
  }

  return 0;
};

export const getWebsiteUsage = (analytics, period) => {
  if (period === "today") {
    const today = getTodayKey();
    return analytics.dailyWebsiteUsage?.[today] || {};
  }

  if (period === "week") {
    const week = getWeekKey();
    const total = {};

    for (const day of week) {
      const dailyData = analytics.dailyWebsiteUsage?.[day];
      if (!dailyData) continue;

      for (const domain in dailyData) {
        total[domain] = (total[domain] || 0) + dailyData[domain];
      }
    }

    return total;
  }

  return {};
};

export const getBlockedWebsiteUsage = (analytics, period) => {
  if (period === "today") {
    const today = getTodayKey();
    return analytics.dailyBlockedWebsiteUsage?.[today] || {};
  }

  if (period === "week") {
    const week = getWeekKey();
    const total = {};

    for (const day of week) {
      const dailyData = analytics.dailyBlockedWebsiteUsage?.[day];
      if (!dailyData) continue;

      for (const domain in dailyData) {
        total[domain] = (total[domain] || 0) + dailyData[domain];
      }
    }

    return total;
  }

  return {};
};

export const getFocusSessions = (analytics, period) => {
  if (period === "today") {
    const today = getTodayKey();

    return analytics.focusSessions.filter((session) => {
      return getDateKey(new Date(session.startTime)) === today;
    });
  }

  if (period === "week") {
    const week = new Set(getWeekKey());

    return analytics.focusSessions.filter((session) => {
      return week.has(getDateKey(new Date(session.startTime)));
    });
  }

  return [];
};

export const getWebsiteTimeline = (analytics, period) => {
  if (period === "today") {
    const today = getTodayKey();
    return (
      analytics.websiteSessions
        ?.filter((session) => {
          return getDateKey(new Date(session.startTime)) === today;
        })
        .sort((a, b) => a.startTime - b.startTime) || []
    );
  }
  if (period === "week") {
    const week = new Set(getWeekKey());
    return (
      analytics.websiteSessions
        ?.filter((session) => {
          return week.has(getDateKey(new Date(session.startTime)));
        })
        .sort((a, b) => a.startTime - b.startTime) || []
    );
  }
  return [];
};

export const getWebsiteTimelineChartData = (sessions) => {
  return sessions.map((session) => {
    const start = new Date(session.startTime);
    const end = new Date(session.endTime);

    const startHour =
      start.getHours() + start.getMinutes() / 60 + start.getSeconds() / 3600;

    const endHour =
      end.getHours() + end.getMinutes() / 60 + end.getSeconds() / 3600;

    return {
      website: session.domain,
      startHour,
      endHour,
      duration: Math.round(session.duration / 60), // minutes
    };
  });
};

export const getHourlyFocus = (analytics, period) => {
  const hourlyFocus = Array.from({ length: 24 }, (_, hour) => ({
    hour: hour.toString().padStart(2, "0"),
    minutes: 0,
  }));
  const sessions = getFocusSessions(analytics, period);
  if (!sessions || sessions.length === 0) {
    return hourlyFocus;
  }
  sessions.forEach((session) => {
    if (!session.startTime) return;
    const date = new Date(session.startTime);
    if (isNaN(date.getTime())) return;
    const hour = date.getHours();
    const minutes =
      session.duration > 60
        ? Math.round(session.duration / 60)
        : Number(session.duration);
    hourlyFocus[hour].minutes += minutes;
  });
  return hourlyFocus;
};

export const getCurrentStreak = (analytics) => {
  let date = new Date();
  let streak = 0;
  while (true) {
    const key = getDateKey(date);
    if ((analytics.dailyFocus[key] || 0) > 0) streak++;
    else break;
    date.setDate(date.getDate() - 1);
  }
  return streak;
};

export const getLongestStreak = (analytics) => {
  const dates = Object.keys(analytics.dailyFocus || {}).sort();
  if (dates.length === 0) {
    return 0;
  }
  let currentStreak = 0;
  let longestStreak = 0;
  let previousDate = null;
  for (const dateKey of dates) {
    const currentDate = new Date(dateKey);
    if (previousDate) {
      const diff = (currentDate - previousDate) / (1000 * 60 * 60 * 24);
      if (diff !== 1) {
        currentStreak = 0;
      }
    }

    if ((analytics.dailyFocus[dateKey] || 0) > 0) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }

    previousDate = currentDate;
  }

  return longestStreak;
};

export const getPeakFocusHour = (analytics, period) => {
  const hourlyFocus = getHourlyFocus(analytics, period);
  return hourlyFocus.reduce((peak, current) =>
    current.minutes > peak.minutes ? current : peak,
  );
};

export const getLongestSession = (analytics, period) => {
  const sessions = getFocusSessions(analytics, period);
  if (sessions.length === 0) {
    return 0;
  }
  return Math.max(...sessions.map((session) => session.duration));
};

export const getAverageSessionLength = (analytics, period) => {
  const sessions = getFocusSessions(analytics, period);
  let avg = 0;
  if (sessions.length === 0) {
    return 0;
  }
  for (let i = 0; i < sessions.length; i++) {
    avg += sessions[i].duration;
  }
  return avg/sessions.length;
};
