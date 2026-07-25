import { useState, useEffect, useRef } from "react";
import { formatTime } from "@/utils/formatTime";
import {
  pauseFocus,
  resumeFocus,
  startFocus,
  stopFocus,
} from "@/app/slices/focus/focusSlice";
import { useSelector, useDispatch } from "react-redux";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import {
  startFocusSession,
  endFocusSession,
} from "@/app/slices/focus/focusThunk";

export function useFocusTimer() {
  const hasCompletedRef = useRef(false);
  const dispatch = useDispatch();
  const focus = useSelector((state) => state.focus);
  const fullDurationMs = (focus.sessionDuration || focus.duration) * 60 * 1000;

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!focus.isActive) {
      setNow(Date.now());
      return;
    }
    setNow(Date.now());

    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 250);

    return () => clearInterval(intervalId);
  }, [focus.isActive]);

  let remainingTime;
  if (focus.isActive) {
    remainingTime = Math.max(0, focus.endTime - now);
  } else if (focus.isPaused) {
    remainingTime = focus.remainingTime;
  } else {
    remainingTime = fullDurationMs;
  }

  const handleStart = async () => {
    if (focus.loading || focus.isActive) {
      return;
    }

    hasCompletedRef.current = false;

    try {
      const focusSession = await dispatch(
        startFocusSession(focus.duration),
      ).unwrap();

      const startTime = new Date(focusSession.startTime).getTime();
      const sessionDuration = focusSession.plannedDuration;
      const endTime = startTime + sessionDuration * 60 * 1000;

      dispatch(
        startFocus({
          startTime,
          endTime,
          sessionId: focusSession._id,
          sessionDuration,
        }),
      );
    } catch (err) {
      console.error("Failed to start focus session:", err);
    }
  };

  const handleStop = async () => {
    if (focus.loading || !focus.currentSessionId || hasCompletedRef.current) {
      return;
    }
    hasCompletedRef.current = true;
    try {
      await dispatch(endFocusSession("stopped")).unwrap();
      dispatch(stopFocus());
    } catch (err) {
      hasCompletedRef.current = false;

      console.error("Failed to cancel focus session:", err);
    }
  };
  const handlePause = () => {
    dispatch(pauseFocus());
  };
  const handleResume = () => {
    dispatch(resumeFocus());
  };

  const time = formatTime(remainingTime);
  let progressPercentage = 0;

  if (focus.isActive && focus.startTime && focus.endTime) {
    const sessionDurationMs = focus.endTime - focus.startTime;
    const elapsedTime = sessionDurationMs - remainingTime;
    progressPercentage = (elapsedTime / sessionDurationMs) * 100;
  }

  return {
    time,
    progressPercentage,
    handleStart,
    handleStop,
    handlePause,
    handleResume,
    focus,
  };
}

const Controls = ({ onStart, onPause, onResume, focus, onReset, loading }) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onReset}
        disabled={loading || (!focus.isActive && !focus.isPaused)}
        className="px-6 py-2.5 border border-border-strong rounded-full text-sm font-semibold text-text hover:bg-surface-muted transition-colors w-28"
      >
        Reset
      </button>

      <button
        onClick={focus.isActive ? onPause : focus.isPaused ? onResume : onStart}
        disabled={loading}
        className="px-6 py-2.5 bg-brand-muted/80  text-text-muted  dark:text-text rounded-full text-sm font-semibold flex items-center justify-center shadow-sm hover:bg-brand-muted  transition-all duration-300 w-32 disabled:cursor-not-allowed"
      >
        <Play size={16} fill="currentColor" className="mr-2" />
        {focus.isActive ? "Pause" : focus.isPaused ? "Resume" : "Start"}
      </button>
    </div>
  );
};

export function Timer() {
  const {
    time,
    progressPercentage,
    handleStart,
    handleStop,
    handlePause,
    handleResume,
    focus,
  } = useFocusTimer();

  return (
    <div className="bg-app shadow-sm border border-border-light rounded-sm relative overflow-hidden flex flex-col items-center justify-center p-12 w-full h-100 mx-auto">
      <div className="absolute top-0 left-0 w-full h-1 bg-border-light">
        <motion.div
          className="h-full bg-brand-muted"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </div>

      <h3 className="text-xs font-bold tracking-[0.15em] text-text-soft uppercase mb-4">
        Current Session
      </h3>

      <div className="text-[80px] font-bold text-brand leading-none mb-10 tracking-tight">
        {time}
      </div>

      <Controls
        onStart={handleStart}
        onReset={handleStop}
        onPause={handlePause}
        onResume={handleResume}
        focus={focus}
        loading={focus.loading}
      />
    </div>
  );
}

export function PopupTimer({ taskName = "Current Session" }) {
  const {
    time,
    progressPercentage,
    handleStart,
    handleStop,
    handlePause,
    handleResume,
    focus,
  } = useFocusTimer();

  const radius = 120;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="flex flex-col bg-page dark:bg-app items-center justify-center p-6 w-full max-w-sm mx-auto">
      <div className="relative flex items-center justify-center size-60">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="-rotate-90 transform"
        >
          <circle
            className="stroke-surface-hover"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#537233"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        <div className="absolute inset-0  flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-text tracking-tight leading-none mb-2">
            {time}
          </span>
          <span className="text-[12px] font-semibold text-text-disabled uppercase tracking-[0.12em] max-w-45 px-2 leading-tight">
            {taskName}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <Controls
          onStart={handleStart}
          onReset={handleStop}
          onPause={handlePause}
          onResume={handleResume}
          focus={focus}
          loading={focus.loading}
        />
      </div>
    </div>
  );
}
