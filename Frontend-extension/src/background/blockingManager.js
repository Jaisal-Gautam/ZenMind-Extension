import parseDomain from "@/utils/siteParser";
import { categoryMatcher } from "@/utils/categoryMatcher";
import {
  isTemporarilyUnlocked,
  cleanupExpiredUnlocks,
} from "@/utils/temporaryUnlock";
const isBlocked = (url, blockingState) => {
  if (!blockingState.guardEnabled) return false;
  const cleanedunlocks = cleanupExpiredUnlocks(blockingState.temporaryUnlocks);
  const currMode = blockingState.activeMode;
  const parsedURL = parseDomain(url);
  if (isTemporarilyUnlocked(parsedURL, cleanedunlocks)) return false;
  const category = categoryMatcher(parsedURL);
  const isCategoryBlocked =
    category !== null && blockingState.blockedCategories.includes(category);

  if (
    currMode === "normal" &&
    (blockingState.blockedSites.includes(parsedURL) || isCategoryBlocked)
  ) {
    return true;
  }

  if (
    currMode === "deep" &&
    (blockingState.blockedSites.includes(parsedURL) ||
      blockingState.deepFocusSites.includes(parsedURL) ||
      isCategoryBlocked)
  ) {
    return true;
  }

  if (
    currMode === "strict" &&
    !blockingState.strictWhitelist.includes(parsedURL)
  ) {
    return true;
  }

  return false;
};

export default isBlocked;
