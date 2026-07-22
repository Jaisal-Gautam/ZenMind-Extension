
import { getDateKey } from "./date.js";
export const getCurrentStreak = (sessions) => {
  const focusDays = new Set(
    sessions.map((session) => getDateKey(session.startTime))
  );

  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // If there was no focus today, start from yesterday.
  if (!focusDays.has(getDateKey(currentDate))) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  let streak = 0;

  while (focusDays.has(getDateKey(currentDate))) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
};

export const getLongestStreak = (sessions) => {
  const focusDays = [...new Set(sessions.map((s) => getDateKey(s.startTime)))].sort();

  if (focusDays.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < focusDays.length; i++) {
    const prev = new Date(focusDays[i - 1]);
    const curr = new Date(focusDays[i]);

    const diff =
      (curr - prev) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current++;
    } else {
      current = 1;
    }

    longest = Math.max(longest, current);
  }

  return longest;
};