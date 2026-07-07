import { LEVELS } from "./constants"
export const getTreeLevel = (xp) => {
  let level = 1;
  for (let i = 0; i < LEVELS.length; i++) {
    if (LEVELS[i].XP <= xp) {
      level = LEVELS[i].level;
    }
  }
  return level;
};