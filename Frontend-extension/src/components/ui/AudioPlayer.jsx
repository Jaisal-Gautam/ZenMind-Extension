import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { musicData } from "@/utils/musicTrack";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import {
  TreePine,
  Volume2,
  VolumeOff,
  SkipBack,
  Play,
  Pause,
  Shell,
  SkipForward,
  Repeat,
} from "lucide-react";

import { musicTime } from "@/utils/formatTime";

// ==========================================
// Sub-Component 1: TrackInfo
// Handles the display of the track title, tags, and visualizer
// ==========================================
const TrackInfo = ({ currentTrack, isPlaying }) => {
  const visualizerHeights = [24, 12, 16, 12, 32, 24, 32, 16, 8];

  return (
    <div className="flex justify-between items-start">
      <div>
        <div className="bg-surface-soft text-brand-muted dark:text-brand rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 w-max mb-4">
          <TreePine className="w-3.5 h-3.5" />
          Nature Sounds
        </div>
        <h2 className="text-3xl font-bold text-text-muted mb-1 tracking-tight">
          {currentTrack?.title}
        </h2>
        <p className="dark:text-text-disabled text-text-soft   text-lg font-medium">
          FocusFlow Ambient
        </p>
      </div>

      <div className="flex gap-1.5 items-end h-10 mt-6">
        {visualizerHeights.map((height, i) => (
          <motion.div
            key={i}
            animate={
              isPlaying
                ? { height: [height, height * 0.6, height] }
                : { height }
            }
            transition={
              isPlaying
                ? {
                    repeat: Infinity,
                    duration: 1.5,
                    delay: i * 0.1,
                  }
                : {
                    duration: 2,
                  }
            }
            className="w-1.5 dark:bg-brand-muted bg-brand rounded-full"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
    </div>
  );
};

// ==========================================
// Sub-Component 2: ProgressBar
// Handles the seeking math and progress rendering
// ==========================================
const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const progressBarRef = useRef(null);
  const progress = duration === 0 ? 0 : (currentTime / duration) * 100;
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const handleSeekClick = (event) => {
    if (!progressBarRef.current || duration <= 0) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const percentage = Math.min(Math.max(clickPosition / rect.width, 0), 1);

    onSeek(percentage * duration);
  };

  return (
    <div className="mt-8">
      <div
        ref={progressBarRef}
        onClick={handleSeekClick}
        className="w-full h-2 bg-border-light rounded-full relative cursor-pointer"
      >
        <div
          className="absolute left-0 top-0 h-full bg-brand dark:bg-brand-muted rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-text-disabled mt-3 font-semibold tracking-wide">
        <span>{musicTime(currentTime)}</span>
        <span>-{musicTime(Math.max(duration - currentTime, 0))}</span>
      </div>
    </div>
  );
};

// ==========================================
// Sub-Component 3: PlayerControls
// Handles all buttons and volume sliders
// ==========================================
const PlayerControls = ({
  isPlaying,
  volume,
  isLooping,
  onPlayPause,
  onPrev,
  onNext,
  onVolumeChange,
  onToggleLoop,
  currentTrack,
  type = "page",
}) => {
  // Store the volume level before muting so we can restore it on unmute
  const [prevVolume, setPrevVolume] = useState(50);

  const handleMuteToggle = () => {
    if (volume === 0) {
      // Unmute: restore previous volume, default to 50 if it was already 0
      onVolumeChange(prevVolume > 0 ? prevVolume : 50);
    } else {
      // Mute: save current volume and set to 0
      setPrevVolume(volume);
      onVolumeChange(0);
    }
  };
  if (type === "page") {
    return (
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-3 text-text-disabled w-32">
          {volume === 0 ? (
            <VolumeOff className="w-5 h-5 stroke-2 shrink-0" />
          ) : (
            <Volume2 className="w-5 h-5 stroke-2 shrink-0" />
          )}
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="w-full h-1.5 bg-border-light rounded-full appearance-none cursor-pointer  accent-brand dark:accent-brand-muted "
          />
        </div>

        <div className="flex items-center gap-6">
          <button
            className="text-text-disabled hover:text-brand transition-colors"
            onClick={onPrev}
          >
            <SkipBack className="w-5 h-5 stroke-2" />
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full border-2 border-brand dark:border-brand-muted flex items-center justify-center text-brand dark:text-brand-muted  hover:bg-surface-soft transition-colors"
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current ml-1" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-1" />
            )}
          </motion.button>

          <button
            className="text-text-disabled hover:text-brand transition-colors"
            onClick={onNext}
          >
            <SkipForward className="w-5 h-5 stroke-2" />
          </button>
        </div>

        <div className="w-32 flex justify-end">
          <button
            className="text-text-disabled hover:text-text transition-colors"
            onClick={onToggleLoop}
          >
            <Repeat
              className={`w-5 h-5 stroke-2 ${
                isLooping ? "text-brand-muted dark:text-brand stroke-3" : ""
              }`}
            />
          </button>
        </div>
      </div>
    );
  } else if (type === "popup") {
    return (
      <div className="flex items-center gap-4">
        {/* 1. Play/Pause Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 rounded-full border border-brand-muted flex items-center justify-center text-brand-muted hover:bg-surface-muted transition-colors"
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-1" />
          )}
        </motion.button>

        {/* 2. Audio Control with Hover Slider */}
        <div className="relative group flex items-center justify-center">
          {/* The Volume Button (Click to Mute/Unmute) */}
          <button
            onClick={handleMuteToggle}
            className="text-text-disabled hover:text-brand-muted p-2 transition-colors rounded-full"
          >
            {volume === 0 ? (
              <VolumeOff className="w-6 h-6 stroke-2" />
            ) : (
              <Volume2 className="w-6 h-6 stroke-2" />
            )}
          </button>

          {/* The Vertical Slider (Hidden by default, shown on group-hover) */}
          <div className="absolute bottom-full z-10 pb-2 hidden group-hover:flex flex-col items-center bg-surface p-3 rounded-xl shadow-lg border border-border-light transition-opacity duration-200">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              style={{
                writingMode: "vertical-lr",
                direction: "rtl",
              }}
              className="h-24 w-1.5 bg-border-light rounded-full cursor-pointer accent-brand-muted"
            />
          </div>
        </div>
      </div>
    );
  }
};

const TrackChange = ({ currentTrack, handleTrackChange }) => {
  return (
    <div className="mt-6">
      <div className="flex gap-2 flex-wrap">
        {musicData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTrackChange(item)}
            className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-sm font-medium transition-colors shadow-sm ${
              currentTrack?.id === item.id
                ? "bg-brand-muted dark:bg-brand text-surface"
                : "bg-surface text-text-muted hover:border-border-brand border border-border-default"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function AudioPlayer() {
  const {
    currentTime,
    duration,
    isPlaying,
    currentTrack,
    volume,
    isLooping,

    handlePlayPause,
    handleNext,
    handlePrev,
    handleSeek,
    handleTrackChange,
    handleVolumeChange,
    handleToggleLoop,
  } = useAudioPlayer();
  return (
    <div className="flex items-center h-full justify-center">
      <div className="h-full rounded-md p-8 w-full">
        <TrackInfo currentTrack={currentTrack} isPlaying={isPlaying} />
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />

        <PlayerControls
          type="page"
          isPlaying={isPlaying}
          volume={volume}
          isLooping={isLooping}
          onPlayPause={handlePlayPause}
          onPrev={handlePrev}
          onNext={handleNext}
          onVolumeChange={handleVolumeChange}
          onToggleLoop={handleToggleLoop}
          currentTrack={currentTrack}
        />
        <div>
          <TrackChange
            currentTrack={currentTrack}
            handleTrackChange={handleTrackChange}
          />
        </div>
      </div>
    </div>
  );
}

export function PopupAudioPlayer() {
  const {
    isPlaying,
    currentTrack,
    volume,

    handlePlayPause,
    handleVolumeChange,
  } = useAudioPlayer();
  // --- Render ---
  return (
    <div className="w-full  p-5 bg-page rounded-lg border border-border-light backdrop-blur-sm shadow-sm font-sans mt-4">
      {/* Top Label */}
      <h3 className="text-xs font-semibold tracking-[0.15em] text-text-disabled mb-4 ml-1 uppercase">
        Ambience
      </h3>

      <div className="flex items-center justify-between">
        {/* Left: Icon & Track Info */}
        <div className="flex items-center gap-4">
          {/* Icon Container */}
          <div className="w-14 h-14 shrink-0 bg-surface-soft rounded-2xl flex items-center justify-center text-brand-muted">
            <Shell size={26} strokeWidth={2} />
          </div>

          {/* Text Container */}
          <div className="flex flex-col justify-center">
            <h2 className="text-sm font-bold text-brand-muted leading-tight tracking-tight ">
              {currentTrack?.title || "Select Track"}
            </h2>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="shrink-0 z-10 pl-2">
          <PlayerControls
            type="popup"
            isPlaying={isPlaying}
            volume={volume}
            onPlayPause={handlePlayPause}
            onVolumeChange={handleVolumeChange}
            currentTrack={currentTrack}
          />
        </div>
      </div>
    </div>
  );
}
