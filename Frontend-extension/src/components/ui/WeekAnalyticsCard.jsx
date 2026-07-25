function WeekAnalyticsCard({icon,heading,value}) {
  return (
    <div className={`flex p-8 flex-1 ${heading==="Distraction Blocked"? "bg-danger-soft":"bg-surface dark:bg-app"} shadow-primary border border-border-default rounded-md flex-col gap-2`}>
      <span className="mb-4">
        {icon}
      </span>
      <span className="text-lg font-bold tracking-wide text-text-soft ">
        {" "}
        {heading}
      </span>
      <span className="text-4xl font-medium font-sans text-text">
        {value}
      </span>
    </div>
  );
}

export default WeekAnalyticsCard;
