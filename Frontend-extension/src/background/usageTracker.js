import parseDomain from "@/utils/siteParser";

let activeTabId = null;
let activeDomain = null;
let startTime = null;

export const startTracking = (tab) => {
  if (!tab?.url) return;

  activeTabId = tab.id;
  activeDomain = parseDomain(tab.url);
  startTime = Date.now();
};

export const stopTracking = () => {
  if (!activeDomain || !startTime) {
    return null;
  }
  const endTime=Date.now();
  const duration = Math.floor(
    (endTime - startTime) / 1000
  );

  const result = {
    domain: activeDomain,
    endTime,
    startTime,
    duration,
  };

  activeTabId = null;
  activeDomain = null;
  startTime = null;

  return result;
};

export const switchTracking = (tab) => {
  const previousSession = stopTracking();

  startTracking(tab);

  return previousSession;
};

export const getCurrentTracking = () => {
  return {
    activeTabId,
    activeDomain,
    startTime,
  };
};