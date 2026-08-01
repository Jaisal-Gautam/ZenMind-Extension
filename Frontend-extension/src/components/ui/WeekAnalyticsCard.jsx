function WeekAnalyticsCard({ icon, heading, value }) {
  return (
    <div
      className={`flex p-4 sm:p-6 md:p-8 flex-1 ${heading === "Distraction Blocked"
          ? "bg-danger-soft"
          : "bg-surface dark:bg-app"
        } shadow-primary border border-border-default rounded-md flex-col gap-1 sm:gap-2`}
    >
      <span className="mb-2 sm:mb-4">{icon}</span>
      <span className="text-sm sm:text-base md:text-lg font-bold tracking-wide text-text-soft">
        {" "}
        {heading}
      </span>
      <span className="text-2xl sm:text-3xl md:text-4xl font-medium font-sans text-text">
        {value}
      </span>
    </div>
  );
}

export default WeekAnalyticsCard;