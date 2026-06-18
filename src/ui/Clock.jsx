import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const radius = 100;
const circum = 2 * Math.PI * radius;

// Helper to convert "HH:MM:SS", "MM:SS", or "MM" into total seconds
const parseTimeToSeconds = (timeStr) => {
  if (!timeStr) return 0;

  const parts = timeStr.split(":").map((p) => parseInt(p, 10) || 0);

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]; // HH:MM:SS
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1]; // MM:SS
  } else if (parts.length === 1) {
    return parts[0] * 60; // MM
  }
  return 0;
};

function Clock({ initialTimeStr = "30:00" }) {
  // Use a string state for the text input
  const [durationStr, setDurationStr] = useState(initialTimeStr);

  const initialSecs = parseTimeToSeconds(initialTimeStr);
  const [totalsec, setTotalSec] = useState(initialSecs);
  const [remaining, setRemaining] = useState(initialSecs);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // Updated format function to handle hours dynamically
  const fmt = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    if (h > 0) {
      return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const elapsed = totalsec > 0 ? (totalsec - remaining) / totalsec : 0;
  const strokeOffset = circum * (1 - elapsed);

  const handleStartStop = () => {
    if (remaining === 0) {
      const secs = parseTimeToSeconds(durationStr);
      if (secs === 0) return; // Prevent starting a 0:00 timer

      setTotalSec(secs);
      setRemaining(secs);
      setRunning(true);
      return;
    }
    setRunning((r) => !r);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    const secs = parseTimeToSeconds(durationStr);
    setTotalSec(secs);
    setRemaining(secs);
  };

  const handleDurationChange = (e) => {
    const val = e.target.value;

    // Regex: Only allow numbers and colons in the input
    if (!/^[0-9:]*$/.test(val)) return;

    setDurationStr(val);

    // Update the live timer if it is currently paused/stopped
    if (!running) {
      const secs = parseTimeToSeconds(val);
      // We still update state even if secs is 0, so the circle resets
      setTotalSec(secs);
      setRemaining(secs);
    }
  };

  const btnLabel = running
    ? "Pause"
    : remaining === 0
      ? "Restart"
      : remaining === totalsec
        ? "Start"
        : "Resume";

  return (
    <div className="flex flex-col items-center gap-6 p-8 font-sans">
      {/* 1. The SVG Circle */}
      <svg viewBox="0 0 220 220" className="w-55 h-55">
        {/* Background Track */}
        <circle
          cx={110}
          cy={110}
          r={radius}
          fill="none"
          strokeWidth={8}
          className="stroke-gray-200"
        />

        {/* Animated Progress Arc */}
        <motion.circle
          cx={110}
          cy={110}
          r={radius}
          fill="none"
          strokeWidth={8}
          strokeLinecap="round"
          className="stroke-green-700"
          strokeDasharray={circum}
          transform="rotate(-90 110 110)"
          initial={{ strokeDashoffset: circum }}
          animate={{ strokeDashoffset: strokeOffset }}
          transition={{ duration: 1, ease: "linear" }}
        />

        {/* Timer Text */}
        <text
          x={110}
          y={120}
          textAnchor="middle"
          className="text-[44px] font-medium fill-gray-900"
        >
          {fmt(remaining)}
        </text>
      </svg>

      {/* 2. Single Text Input for HR:MIN:SEC */}
      <div className="flex gap-2 items-center text-gray-600 text-sm">
        <span>Duration:</span>
        <input
          type="text"
          placeholder="MM:SS"
          value={durationStr}
          onChange={handleDurationChange}
          className="w-24 p-2 text-center rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-600 transition-shadow text-gray-800 font-medium"
        />
      </div>

      {/* 3. Controls */}
      <div className="flex gap-3">
        <motion.button
          onClick={handleStartStop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 text-base font-body  font-bold rounded-lg border border-secondary bg-secondary text-white shadow-sm hover:bg-primary focus:outline-none"
        >
          {btnLabel}
        </motion.button>

        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 text-base font-body font-bold rounded-lg border border-gray-300 bg-neutral text-gray-900 shadow-sm hover:bg-tertiary focus:outline-none"
        >
          Reset
        </motion.button>
      </div>
    </div>
  );
}

export default Clock;
