export const formatTime = (time) => {
  const hours = Math.floor((time / 1000 / 60 / 60) % 60);
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formatterminutes = minutes < 10 ? `0${minutes}` : minutes;
  return (
    <>
      {hours}:{formatterminutes}:{formattedSeconds}
    </>
  );
};
export const analyticsTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  return (
    <>
      {hours > 0 && `${hours}h `}
      {minutes > 0 && `${minutes}m `}
    </>
  );
};

export const goalTime = (time)=>{
  const hours = Math.floor(time / 60);
  return (
    <>
      {hours > 0 && `${hours}h `}
      {time > 0 && `${time}m `}
    </>
  );

}
export const usageTime = (time) => {
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time / 60) % 60);
  const sec = Math.floor(time % 60);
  return (
    <>
      {hour}h {min}m {sec}s
    </>
  );
};

export const formatHourRange = (hour) => {
  const startHour = Number(hour);
  const endHour = (startHour + 1) % 24;
  const formatHour = (h) => {
    const displayHour = h % 12 || 12;
    const period = h < 12 ? "AM" : "PM";
    return `${displayHour} ${period}`;
  };
  return `${formatHour(startHour)} – ${formatHour(endHour)}`;
};

export const musicTime = (time) => {
  if (!Number.isFinite(time)) return "00:00";
  const min = Math.floor((time / 60) % 60);
  const sec = Math.floor(time % 60);
  return (
    <>
      {min<10? `0${min}` : min}:{sec<10? `0${sec}` : sec}
    </>
  );
};
