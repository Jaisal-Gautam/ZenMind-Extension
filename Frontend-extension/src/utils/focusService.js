import { stopFocus } from "@/app/slices/focus/focusSlice";
import { addFocusSession } from "@/app/slices/analytic/analyticsSlice";
export const focusSessionService = ({dispatch, focus}) => {
  const session = buildSession(focus);
  // Adding Focus Session to Analytics
  recordFocusSession(dispatch,session)
  // Stopping Focus Timer
  stopFocusSession(dispatch);
  //Sending Session Completed Notification
  sendNotification(focus);

  return session;
};
const buildSession=(focus)=>{
    return {
    id: focus.currentSessionId,
    startTime: focus.startTime,
    endTime: focus.endTime,
    duration: focus.duration,
  };
}

const recordFocusSession=(dispatch, session)=>{
    dispatch(addFocusSession(session));
}
const stopFocusSession=(dispatch)=>{
    dispatch(stopFocus());
}
const sendNotification=(focus)=>{
     chrome.runtime.sendMessage({
    type: "FOCUS_COMPLETED",
    duration: focus.sessionDuration,
  });
}