import { useState, useEffect } from "react";
import { useSound } from "react-sounds";
import {
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  TreePine, 
  CloudRain, 
  Waves, 
  Wind 
} from "lucide-react";

// Map your requested sound IDs to their UI display data
const AMBIENT_TRACKS = [
  { id: "ambient/rain", name: "Forest Rain",  Icon: CloudRain },
  { id: "ambient/water_stream", name: "Water Stream",  Icon: Waves },
  { id: "ambient/wind", name: "Wind",  Icon: Wind },
  { id: "ambient/campfire", name: "Campfire",  Icon: TreePine }, 
];

export default function AmbiencePlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const track = AMBIENT_TRACKS[currentIndex];

  // Initialize the sound hook with the current track's ID
  const { 
    play, 
    pause, 
    stop, 
    isPlaying, 
    isLoaded 
  } = useSound(track.id);

  // Clean up audio when switching tracks or unmounting
  useEffect(() => {
    return () => {
      if (stop) stop();
    };
  }, [track.id, stop]);

  const handlePlayPause = () => {
    if (!isLoaded) return;
    
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleNext = () => {
    if (stop) stop();
    setCurrentIndex((prev) => (prev + 1) % AMBIENT_TRACKS.length);
  };

  const handlePrev = () => {
    if (stop) stop();
    setCurrentIndex((prev) => (prev - 1 + AMBIENT_TRACKS.length) % AMBIENT_TRACKS.length);
  };

  return (
    <div className="w-full max-w-md p-6 bg-[#FAFAFA] border border-gray-200 rounded-[2.5rem] font-sans shadow-sm">
      
      {/* Header */}
      <h3 className="text-xs font-semibold tracking-widest text-primary mb-6 uppercase">
        Ambience
      </h3>

      {/* Main Content Row */}
      <div className="flex items-center justify-between">
        
        {/* Left Side: Icon & Text */}
        <div className="flex items-center  gap-4">
          {/* Dynamic Icon Box */}
          <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center">
            <track.Icon className="w-6 h-6 text-primary" strokeWidth={2} />
          </div>

          {/* Text Info */}
          <div className="flex flex-col ">
            <h2 className="text-md font-bold text-neutral-600 leading-tight mb-1">
              {track.name}
            </h2>

          </div>
        </div>

        {/* Right Side: Playback Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors"
            aria-label="Previous sound"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Main Play/Pause Button */}
          <button 
            onClick={handlePlayPause}
            disabled={!isLoaded}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              isLoaded 
                ? "border-gray-300 text-[#1E2E24] hover:bg-gray-100 hover:border-gray-400 cursor-pointer" 
                : "border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" strokeWidth={1.5} />
            ) : (
              <Play className="w-4 h-4 fill-current ml-1" strokeWidth={1.5} />
            )}
          </button>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors"
            aria-label="Next sound"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}