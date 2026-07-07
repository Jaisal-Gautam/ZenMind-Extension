import { getData, setData } from "@/utils/chromeStorage";
import { DefaultState } from "@/utils/constants";
import { getTodayKey } from "@/utils/todayDate";
export const saveWebsiteUsage = async (domain, duration) => {
  if (!domain || duration <= 0) return;
  const today = getTodayKey();
  let state = (await getData()) || DefaultState;
  if (!state.analytics) {
    state.analytics = {};
  }
  if (!state.analytics.dailyWebsiteUsage) {
    state.analytics.dailyWebsiteUsage = {};
  }
  if (!state.analytics.websiteUsage) {
    state.analytics.websiteUsage = {};
  }
  state.analytics.websiteUsage[domain] =
    (state.analytics.websiteUsage[domain] || 0) + duration;
  if (!state.analytics.dailyWebsiteUsage[today]) {
    state.analytics.dailyWebsiteUsage[today] = {};
  }
  state.analytics.dailyWebsiteUsage[today][domain] =
    (state.analytics.dailyWebsiteUsage[today][domain] || 0) + duration;

  await setData(state);
  console.log("Saved usage:", domain, state.analytics.websiteUsage[domain]);
};

export const saveBlockedAttempt = async (domain) => {
  const today = getTodayKey();
  if (!domain) return;
  let state = (await getData()) || DefaultState;
  if (!state.analytics) {
    state.analytics = {};
  }
  if (!state.analytics.blockedAttempts) {
    state.analytics.blockedAttempts = {};
  }
  if (!state.analytics.dailyBlockedAttempts) {
    state.analytics.dailyBlockedAttempts = {};
  }
  if (!state.analytics.dailyBlockedWebsiteUsage) {
    state.analytics.dailyBlockedWebsiteUsage = {};
  }
  state.analytics.blockedAttempts[domain] =
    (state.analytics.blockedAttempts[domain] || 0) + 1;

  state.analytics.dailyBlockedAttempts[today] =
    (state.analytics.dailyBlockedAttempts[today] || 0) + 1;

  if (!state.analytics.dailyBlockedWebsiteUsage[today]) {
    state.analytics.dailyBlockedWebsiteUsage[today] = {};
  }
  state.analytics.dailyBlockedWebsiteUsage[today][domain] =
    (state.analytics.dailyBlockedWebsiteUsage[today][domain] || 0) + 1;
  await setData(state);
};

export const saveWebsiteSession=async (session)=>{
   if (!session || !session.domain || session.duration <= 0) {
    return;
  }
  let state = (await getData()) || DefaultState;
  if (!state.analytics) {
    state.analytics = {};
  }
  if(!state.analytics.websiteSessions){
    state.analytics.websiteSessions=[];
  }
  state.analytics.websiteSessions.push(session);
   await setData(state);
}