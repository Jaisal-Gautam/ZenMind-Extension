function WeekAnalyticsCard({icon,heading,value}) {
  return (
    <div className={`flex p-8 flex-1 ${heading=="Distraction Blocked"? "bg-red-200":"bg-white"} shadow-primary rounded-md flex-col gap-2`}>
      <span className="mb-4">
        {icon}
      </span>
      <span className="text-lg font-bold tracking-wide text-neutral-600 ">
        {" "}
        {heading}
      </span>
      <span className="text-4xl font-medium font-sans text-neutral-800">
        {value}
      </span>
    </div>
  );
}

export default WeekAnalyticsCard;
