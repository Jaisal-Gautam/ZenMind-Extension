import { useEffect, useRef } from "react";

const getTodayKey = () => {
  const today = new Date();

  return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
};

export default function useDayChange(callback) {
  const lastDay = useRef(getTodayKey());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDay = getTodayKey();

      if (currentDay !== lastDay.current) {
        lastDay.current = currentDay;
        callback();
      }
    }, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, [callback]);
}