import isBlocked from "./blockingManager";
import { getData, setData } from "@/utils/chromeStorage";
import {
  startTracking,
  switchTracking,
  getCurrentTracking,
  stopTracking,
} from "./usageTracker";
import {
  saveWebsiteUsage,
  saveBlockedAttempt,
  saveWebsiteSession,
} from "./usageStorage";
import parseDomain from "@/utils/siteParser";
import { recoverFocusSession } from "@/utils/SessionRecove.js";
import { recoverCompletedSession } from "@/utils/completeFocusSession";
import { showFocusCompleteNotification } from "@/utils/notification.js";
async function initializeBackground() {
  const recovery = await recoverFocusSession();

  switch (recovery.status) {
    case "none":
      console.log("Nothing to recover");
      break;

    case "active":
      console.log("Recovered active session");
      break;

    case "expired": {
      const updatedState = recoverCompletedSession(recovery.state);
      await setData(updatedState);
      break;
    }
  }
}

initializeBackground();
chrome.tabs
  .query({
    active: true,
    lastFocusedWindow: true,
  })
  .then((tab) => {
    if (tab.length !== 0) {
      if (tab[0].url) {
        console.log(tab[0].url);
        if (
          !tab[0].url.startsWith("chrome-extension://") &&
          !tab[0].url.startsWith("chrome://") &&
          !tab[0].url.startsWith("about:blank")
        ) {
          startTracking(tab[0]);
        }
      }
    }
  });

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (!tab?.url) return;
  if (
    tab.url.startsWith("chrome-extension://") ||
    tab.url.startsWith("chrome://") ||
    tab.url.startsWith("about:blank")
  ) {
    return;
  }
  console.log("Switched to", tab.url);
  const session = switchTracking(tab);
  if (session) {
    await saveWebsiteUsage(session.domain, session.duration);
    await saveWebsiteSession(session);
  }
});
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete" || !tab.url) {
    return;
  }
  if (
    tab.url.startsWith("chrome-extension://") ||
    tab.url.startsWith("chrome://") ||
    tab.url.startsWith("about:blank")
  ) {
    return;
  }
  const state = await getData();
  if (!state || !state.blocking) {
    return;
  }

  if (isBlocked(tab.url, state.blocking)) {
    await saveBlockedAttempt(parseDomain(tab.url));
    await chrome.tabs.update(tabId, {
      url:
        chrome.runtime.getURL("blocked.html") +
        `?url=${encodeURIComponent(tab.url)}`,
    });
    return;
  }
  const tracking = getCurrentTracking();
  if (tracking.activeTabId === tabId) {
    const currentDomain = tracking.activeDomain;
    const newDomain = parseDomain(tab.url);
    if (currentDomain !== newDomain) {
      const previousSession = switchTracking(tab);
      if (previousSession) {
        await saveWebsiteUsage(
          previousSession.domain,
          previousSession.duration,
        );
        await saveWebsiteSession(previousSession);
        console.log(
          "Saved usage:",
          previousSession.domain,
          previousSession.duration,
        );
      }
    }
  }

});

chrome.idle.setDetectionInterval(60);

chrome.idle.onStateChanged.addListener(async (state) => {
  if (state === "locked") {
    const session = stopTracking();

    if (session) {
      await saveWebsiteUsage(session.domain, session.duration);
      await saveWebsiteSession(session);
    }

    return;
  }

  if (state === "active") {
    const tabs = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    if (tabs.length === 0) return;

    const tab = tabs[0];

    if (
      !tab.url ||
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("chrome-extension://") ||
      tab.url.startsWith("about:blank")
    ) {
      return;
    }

    const tracking = getCurrentTracking();

    if (!tracking.activeTabId) {
      startTracking(tab);
    }
  }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  switch (message.type) {
    case "AUDIO_STATE":
      await ensureOffscreenDocument();
      chrome.runtime.sendMessage(message);
      break;
    case "PLAY":
      await ensureOffscreenDocument();
      console.log("Forwarding to offscreen");
      chrome.runtime.sendMessage({
        type: "OFFSCREEN_PLAY",
        src: message.src,
      });
      break;
    case "SET_TRACK":
      await ensureOffscreenDocument();
      chrome.runtime.sendMessage({
        type: "SET_TRACK",
        src: message.src,
      });
      break;
    case "PAUSE":
      await ensureOffscreenDocument();
      chrome.runtime.sendMessage({
        type: "PAUSE",
      });
      break;
    case "SET_VOLUME":
      await ensureOffscreenDocument();
      chrome.runtime.sendMessage({
        type: "SET_VOLUME",
        volume: message.volume,
      });
      break;
    case "SET_LOOP":
      await ensureOffscreenDocument();
      chrome.runtime.sendMessage({
        type: "SET_LOOP",
        loop: message.loop,
      });
      break;
    case "SEEK":
      await ensureOffscreenDocument();
      chrome.runtime.sendMessage({
        type: "SEEK",
        currentTime: message.currentTime,
      });
      break;

    case "FOCUS_COMPLETED":
      console.log("Showing notification");
      showFocusCompleteNotification(message.duration);
      return;

    case "TEMP_UNLOCK": {
      const state = await getData();

      if (!state || !state.blocking) {
        return;
      }

      let tempunlock = state.blocking.temporaryUnlocks;

      tempunlock = tempunlock.filter(
        (unlock) => unlock.domain !== message.domain,
      );

      const domain = message.domain;
      const expiresAt = Date.now() + message.minutes * 60 * 1000;

      tempunlock.push({ domain, expiresAt });

      state.blocking.temporaryUnlocks = tempunlock;

      await setData(state);

      chrome.alarms.create(`unlock-${domain}`, {
        when: expiresAt,
      });

      if (sender.tab?.id) {
        await chrome.tabs.update(sender.tab.id, {
          url: message.originalUrl,
        });
      }

      return;
    }

    default:
      console.warn("Unknown message:", message.type);
      return;
  }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (!alarm.name.startsWith("unlock-")) return;

  const domain = alarm.name.replace("unlock-", "");

  const state = await getData();

  if (!state || !state.blocking) return;

  state.blocking.temporaryUnlocks = state.blocking.temporaryUnlocks.filter(
    (unlock) => unlock.domain !== domain,
  );

  await setData(state);

  const tabs = await chrome.tabs.query({});

  for (const tab of tabs) {
    if (!tab.url) continue;

    try {
      if (parseDomain(tab.url) === domain) {
        chrome.tabs.reload(tab.id);
      }
    } catch {
      continue;
    }
  }
});

const OFFSCREEN_DOCUMENT_PATH = "offscreen.html";

let creatingOffscreen = null;

async function ensureOffscreenDocument() {
  const offscreenUrl = chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH);

  if (creatingOffscreen) {
    await creatingOffscreen;
    return;
  }

  if ("getContexts" in chrome.runtime) {
    const contexts = await chrome.runtime.getContexts({
      contextTypes: ["OFFSCREEN_DOCUMENT"],
      documentUrls: [offscreenUrl],
    });

    if (contexts.length > 0) return;
  } else {
    const clients = await self.clients.matchAll();
    const hasOffscreen = clients.some((client) => client.url === offscreenUrl);

    if (hasOffscreen) return;
  }

  try {
    creatingOffscreen = chrome.offscreen.createDocument({
      url: OFFSCREEN_DOCUMENT_PATH,
      reasons: ["AUDIO_PLAYBACK"],
      justification: "Play ambient audio across popup and extension pages.",
    });

    await creatingOffscreen;
  } finally {
    creatingOffscreen = null;
  }
}

chrome.runtime.onStartup.addListener(() => {
  ensureOffscreenDocument();
});

chrome.runtime.onInstalled.addListener(() => {
  ensureOffscreenDocument();
});

async function timerFunction() {
  const state = await getData();

  if (!state || !state.focus) {
    return;
  }

  if (state.focus.isActive) {
    if (Date.now() >= state.focus.endTime) {
      const duration = state.focus.sessionDuration;
      const session = {
        id: state.focus.currentSessionId,
        startTime: state.focus.startTime,
        endTime: state.focus.endTime,
        duration: state.focus.sessionDuration,
      };
      chrome.runtime.sendMessage({
        type: "FOCUS_SESSION_COMPLETED",
        session,
      });
      const updatedState = recoverCompletedSession(state);
      await setData(updatedState);
      showFocusCompleteNotification(duration);
    }
  }
}

setInterval(timerFunction, 1000);
