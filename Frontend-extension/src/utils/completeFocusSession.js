import { getTodayKey } from "./todayDate";
export const recoverCompletedSession = (state) => {
  const focus = state.focus;
  



 focus.isActive = false;
focus.isPaused = false;

focus.startTime = null;
focus.remainingTime = null;
focus.currentSessionId = null;
focus.sessionDuration = null;
focus.lastResumedAt = null;

return state;
};
