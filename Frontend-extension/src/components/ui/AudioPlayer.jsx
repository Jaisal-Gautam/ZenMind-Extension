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
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
      <div>
        <div className="bg-surface-soft text-brand-muted dark:text-brand rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-medium flex items-center gap-1.5 w-max mb-2 sm:mb-4">
          <TreePine className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          Nature Sounds
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-muted mb-1 tracking-tight">
          {currentTrack?.title}
        </h2>
        <p className="dark:text-text-disabled text-text-soft text-sm sm:text-lg font-medium">
          FocusFlow Ambient
        </p>
      </div>

      <div className="flex gap-1.5 items-end h-8 sm:h-10 mt-2 sm:mt-6">
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
            className="w-1 sm:w-1.5 dark:bg-brand-muted bg-brand rounded-full"
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

  const handleSeekClick = (event) => {
    if (!progressBarRef.current || duration <= 0) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const percentage = Math.min(Math.max(clickPosition / rect.width, 0), 1);

    onSeek(percentage * duration);
  };

  return (
    <div className="mt-4 sm:mt-8">
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
      <div className="flex justify-between text-xs text-text-disabled mt-2 sm:mt-3 font-semibold tracking-wide">
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
  type = "page",
}) => {
  const [prevVolume, setPrevVolume] = useState(50);

  const handleMuteToggle = () => {
    if (volume === 0) {
      onVolumeChange(prevVolume > 0 ? prevVolume : 50);
    } else {
      setPrevVolume(volume);
      onVolumeChange(0);
    }
  };

  if (type === "page") {
    return (
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 sm:gap-0 mt-4 sm:mt-6">
        <div className="flex items-center gap-2 sm:gap-3 text-text-disabled w-28 sm:w-32 order-2 sm:order-1">
          {volume === 0 ? (
            <VolumeOff className="w-4 h-4 sm:w-5 sm:h-5 stroke-2 shrink-0" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-2 shrink-0" />
          )}
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="w-full h-1.5 bg-border-light rounded-full appearance-none cursor-pointer accent-brand dark:accent-brand-muted"
          />
        </div>

        <div className="flex items-center gap-4 sm:gap-6 order-1 sm:order-2 w-full sm:w-auto justify-center">
          <button
            className="text-text-disabled hover:text-brand transition-colors"
            onClick={onPrev}
          >
            <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 stroke-2" />
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-brand dark:border-brand-muted flex items-center justify-center text-brand dark:text-brand-muted hover:bg-surface-soft transition-colors"
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
            )}
          </motion.button>

          <button
            className="text-text-disabled hover:text-brand transition-colors"
            onClick={onNext}
          >
            <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 stroke-2" />
          </button>
        </div>

        <div className="w-auto sm:w-32 flex justify-end order-3">
          <button
            className="text-text-disabled hover:text-text transition-colors"
            onClick={onToggleLoop}
          >
            <Repeat
              className={`w-4 h-4 sm:w-5 sm:h-5 stroke-2 ${isLooping ? "text-brand-muted dark:text-brand stroke-3" : ""
                }`}
            />
          </button>
        </div>
      </div>
    );
  } else if (type === "popup") {
    return (
      <div className="flex items-center gap-2 sm:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-brand-muted flex items-center justify-center text-brand hover:bg-surface-muted transition-colors"
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
          )}
        </motion.button>

        <div className="relative group flex items-center justify-center">
          <button
            onClick={handleMuteToggle}
            className="text-text-disabled hover:text-brand-muted p-1.5 sm:p-2 transition-colors rounded-full"
          >
            {volume === 0 ? (
              <VolumeOff className="w-5 h-5 sm:w-6 sm:h-6 stroke-2" />
            ) : (
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-2" />
            )}
          </button>

          <div className="absolute bottom-full z-10 pb-2 hidden group-hover:flex flex-col items-center bg-surface p-2 sm:p-3 rounded-xl shadow-lg border border-border-light transition-opacity duration-200">
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
              className="h-20 sm:h-24 w-1.5 bg-border-light rounded-full cursor-pointer accent-brand-muted"
            />
          </div>
        </div>
      </div>
    );
  }
};

const TrackChange = ({ currentTrack, handleTrackChange }) => {
  return (
    <div className="mt-4 sm:mt-6">
      <div className="flex gap-1.5 sm:gap-2 flex-wrap">
        {musicData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTrackChange(item)}
            className={`flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-colors shadow-sm ${currentTrack?.id === item.id
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
      <div className="h-full rounded-md p-3 sm:p-6 md:p-8 w-full">
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

  return (
    <div className="w-full p-3 sm:p-5 bg-page dark:bg-app rounded-lg border border-border-light backdrop-blur-sm shadow-sm font-sans mt-4">
      <h3 className="text-xs font-semibold tracking-[0.15em] text-text-disabled mb-3 sm:mb-4 ml-1 uppercase">
        Ambience
      </h3>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-10 h-10 sm:w-14 sm:h-14 shrink-0 bg-surface-soft rounded-xl sm:rounded-2xl flex items-center justify-center text-brand">
            <Shell className="size-5 sm:size-6" strokeWidth={2} />
          </div>

          <div className="flex flex-col justify-center min-w-0">
            <h2 className="text-[14px] sm:text-sm font-semibold  text-brand dark:text-text leading-tight tracking-tight truncate">
              {currentTrack?.title || "Select Track"}
            </h2>
          </div>
        </div>

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