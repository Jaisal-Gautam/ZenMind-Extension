import { getTotalXP } from "./xpEngine";
import { getTreeLevel } from "./levelEngine";
import { getStageInfo } from "./stageEngine";
import { getProgressInfo } from "./progressEngine";
import { getUnlockInfo } from "./unlockEngine";
export const getSanctuaryData = (analytics) => {
  const xp = getTotalXP(analytics);
  const lvl = getTreeLevel(xp);
  const stage = getStageInfo(lvl);
  const progress = getProgressInfo(xp, lvl);
  const unlock = getUnlockInfo(lvl);

  return {
    xp,
    lvl,
    ...stage,
    ...progress,
    ...unlock,
  };
};