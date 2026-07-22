import { getTodayKey, getWeekKey, getDateKey } from "./todayDate";
export const getFocus = (analytics, period) => {
  const dailyFocus = analytics?.dailyFocus || {};
  if (period === "today") {
    const today = getTodayKey();
    return dailyFocus[today] || 0;
  }

  if (period === "week") {
    const week = getWeekKey();
    let total = 0;

    for (const day of week) {
      total += dailyFocus[day] || 0;
    }
    return total;
  }

  if (period === "all") {
    return Object.values(dailyFocus).reduce((sum, value) => sum + (value || 0), 0);
  }

  return 0;
};

export const getBlockedAttempts = (analytics, period) => {
  const dailyBlockedAttempts = analytics?.dailyBlockedAttempts || {};
  if (period === "today") {
    const today = getTodayKey();
    return dailyBlockedAttempts[today] || 0;
  }

  if (period === "week") {
    const week = getWeekKey();
    let total = 0;

    for (const day of week) {
      total += dailyBlockedAttempts[day] || 0;
    }

    return total;
  }

  return 0;
};

export const getWebsiteUsage = (analytics, period) => {
  if (period === "today") {
    return analytics?.websiteUsage || [];
  }

  // Keep existing weekly aggregation until backend supports it
  if (period === "week") {
    const week = getWeekKey();
    const total = {};

    for (const day of week) {
      const dailyData = analytics?.dailyWebsiteUsage?.[day];
      if (!dailyData) continue;

      for (const domain in dailyData) {
        total[domain] = (total[domain] || 0) + dailyData[domain];
      }
    }

    return Object.entries(total).map(([domain, duration]) => ({
      domain,
      duration,
    }));
  }

  return [];
};
export const getBlockedWebsiteUsage = (analytics, period) => {
  if (period === "today") {
    const today = getTodayKey();
    return analytics?.dailyBlockedWebsiteUsage?.[today] || {};
  }

  if (period === "week") {
    const week = getWeekKey();
    const total = {};

    for (const day of week) {
      const dailyData = analytics?.dailyBlockedWebsiteUsage?.[day];
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
  const sessions = analytics?.focusSessions || [];
  if (period === "today") {
    const today = getTodayKey();

    return sessions.filter((session) => {
      return getDateKey(new Date(session.startTime)) === today;
    });
  }

  if (period === "week") {
    const week = new Set(getWeekKey());

    return sessions.filter((session) => {
      return week.has(getDateKey(new Date(session.startTime)));
    });
  }

  return [];
};

export const getWebsiteTimeline = (analytics, period) => {
  const sessions = analytics?.websiteSessions || [];
  if (period === "today") {
    const today = getTodayKey();
    return sessions
      .filter((session) => {
        return getDateKey(new Date(session.startTime)) === today;
      })
      .sort((a, b) => a.startTime - b.startTime);
  }
  if (period === "week") {
    const week = new Set(getWeekKey());
    return sessions
      .filter((session) => {
        return week.has(getDateKey(new Date(session.startTime)));
      })
      .sort((a, b) => a.startTime - b.startTime);
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
  const hourlyFocus = Array.from({ length: 25 }, (_, hour) => ({
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


export const getPeakFocusHour = (analytics) => {
  if (analytics.peakFocusHour === null || analytics.peakFocusHour === undefined) {
    return {
      hour: 0,
      minutes: 0,
    };
  }

  return {
    hour: analytics.peakFocusHour,
    minutes: 0,
  };
};
export const getLongestSession = (analytics) => {
  return analytics.longestSession || 0;
};

export const getAverageSessionLength = (analytics) => {
  return analytics.averageSession || 0;
};