import { getTodayKey } from "./todayDate";
export const recoverCompletedSession = (state) => {
  const focus = state.focus;
  const completedSession = {
    id: focus.currentSessionId,
    startTime: focus.startTime,
    endTime: focus.endTime,
    duration: focus.sessionDuration,
    
  };



 
  focus.isActive = false;
  focus.isPaused = false;
  focus.startTime = null;
  focus.endTime = null;
  focus.remainingTime = null;
  focus.currentSessionId = null;
  return state;
};
