import { LEVELS } from "./constants";

export const getProgressInfo = (xp, level) => {
  if (level >= LEVELS.length) {
    const currentLevelXP = LEVELS[LEVELS.length - 1].XP;

    return {
      currentLevelXP,
      nextLevelXP: currentLevelXP,
      totalXP: xp,
      xpIntoLevel: xp - currentLevelXP,
      levelXP: 0,
      remainingXP: 0,
      progress: 100,
    };
  }

  const currentLevelXP = LEVELS[level - 1].XP;
  const nextLevelXP = LEVELS[level].XP;

  const xpIntoLevel = xp - currentLevelXP;
  const levelXP = nextLevelXP - currentLevelXP;

  return {
    currentLevelXP,
    nextLevelXP,
    totalXP: xp,
    xpIntoLevel,
    levelXP,
    remainingXP: nextLevelXP - xp,
    progress: Math.round((xpIntoLevel / levelXP) * 100),
  };
};