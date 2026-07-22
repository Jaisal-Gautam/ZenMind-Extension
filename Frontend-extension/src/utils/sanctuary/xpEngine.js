export const getTotalXP = (analytics = {}) => {
  const {
    totalFocusTime = 0,

  } = analytics;

  return (
    Math.floor(totalFocusTime/60 * 5) 
  );
};