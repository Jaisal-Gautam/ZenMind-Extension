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
  pauseFocusSession,
  resumeFocusSession,
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
    const elapsed = now - focus.lastResumedAt;

    remainingTime = Math.max(
      0,
      focus.remainingTime - elapsed
    );
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
      dispatch(
        startFocus({
          startTime,
          sessionId: focusSession._id,
          sessionDuration,
        })
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
      await dispatch(endFocusSession("cancelled")).unwrap();
      dispatch(stopFocus());
    } catch (err) {
      hasCompletedRef.current = false;

      console.error("Failed to cancel focus session:", err);
    }
  };
  const handlePause = async () => {
    if (focus.loading) return;

    try {
      await dispatch(pauseFocusSession()).unwrap();
      dispatch(pauseFocus());
    } catch (err) {
      console.error(err);
    }
  };
  const handleResume = async () => {
    if (focus.loading) return;

    try {
      await dispatch(resumeFocusSession()).unwrap();
      dispatch(resumeFocus(Date.now()));
    } catch (err) {
      console.error(err);
    }
  };

  const time = formatTime(remainingTime);

  const progressPercentage = Math.min(
    100,
    Math.max(
      0,
      fullDurationMs > 0
        ? ((fullDurationMs - remainingTime) / fullDurationMs) * 100
        : 0,
    ),
  );
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
    <div className="flex items-center space-x-3 sm:space-x-4">
      <button
        onClick={onReset}
        disabled={loading || (!focus.isActive && !focus.isPaused)}
        className="px-4 sm:px-6 py-2.5 border border-border-strong rounded-full text-sm font-semibold text-text hover:bg-surface-muted transition-colors min-w-22 sm:w-28"
      >
        Reset
      </button>

      <button
        onClick={focus.isActive ? onPause : focus.isPaused ? onResume : onStart}
        disabled={loading}
        className="px-4 sm:px-6 py-2.5 bg-brand-muted/80 text-text-muted dark:text-text rounded-full text-sm font-semibold flex items-center justify-center shadow-sm hover:bg-brand-muted transition-all duration-300 min-w-25 sm:w-32 disabled:cursor-not-allowed"
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
    <div className="bg-app shadow-sm border border-border-light rounded-sm relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-10 md:p-12 w-full h-64 sm:h-80 md:h-100 mx-auto">
      <div className="absolute top-0 left-0 w-full h-1 bg-border-light">
        <motion.div
          className="h-full bg-brand-muted"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </div>

      <h3 className="text-xs font-bold tracking-[0.15em] text-text-soft uppercase mb-3 sm:mb-4">
        Current Session
      </h3>

      <div className="text-[52px] sm:text-[68px] md:text-[80px] font-bold text-brand leading-none mb-6 sm:mb-8 md:mb-10 tracking-tight">
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
    <div className="flex flex-col bg-page dark:bg-app items-center justify-center p-6 w-full">
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
