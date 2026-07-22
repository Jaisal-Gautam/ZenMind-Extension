export const getDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export const formatLabel = (date, range) => {
  if (range === "daily") {
    return "Today";
  }

  return date.toLocaleDateString("en-US", {
    weekday: "short",
  });
};
export const formatHour = (hour) => {
  const format = (h) => {
    const displayHour = h % 12 || 12;
    const period = h < 12 ? "AM" : "PM";

    return `${displayHour} ${period}`;
  };

  return `${format(hour)} – ${format((hour + 1) % 24)}`;
};