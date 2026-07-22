export const showFocusCompleteNotification = (duration) => {

  chrome.notifications.create({
  type: "basic",
  iconUrl: chrome.runtime.getURL("icons/icon16.png"),
  title: "Session Completed",
  message: `Great work! You completed a ${duration}-minute focus session.`,
});
};