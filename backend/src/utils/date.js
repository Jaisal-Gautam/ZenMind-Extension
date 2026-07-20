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
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour} ${period}`;
};