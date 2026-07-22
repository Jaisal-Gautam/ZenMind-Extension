import { DateTime } from "luxon";

export const getDayBounds = (timezone = "UTC") => {
  const start = DateTime.now().setZone(timezone).startOf("day");
  const end = start.plus({ days: 1 });

  return {
    todayStart: start.toUTC().toJSDate(),
    tomorrowStart: end.toUTC().toJSDate(),
  };
};