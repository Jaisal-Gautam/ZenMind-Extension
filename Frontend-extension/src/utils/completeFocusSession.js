import { getTodayKey } from "./todayDate";
export const recoverCompletedSession = (state) => {
  const focus = state.focus;
  const analytics = state.analytics;
  const completedSession = {
    id: focus.currentSessionId,
    startTime: focus.startTime,
    endTime: focus.endTime,
    duration: focus.sessionDuration,
    
  };
  analytics.focusSessions.push(completedSession);

  analytics.totalFocusTime += completedSession.duration;
  const today = getTodayKey();

  analytics.dailyFocus[today] =
    (analytics.dailyFocus[today] || 0) + completedSession.duration;

  focus.isActive = false;
  focus.isPaused = false;
  focus.startTime = null;
  focus.endTime = null;
  focus.remainingTime = null;
  focus.currentSessionId = null;
  return state;
};
