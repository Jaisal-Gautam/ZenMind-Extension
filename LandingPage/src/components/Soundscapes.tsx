import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CloudRain, Wind, Flame, Waves, Play, Pause, SkipBack, SkipForward, Repeat } from 'lucide-react';

const sounds = [
  { name: 'Forest Rain', file: '/music/Forest.opus', icon: CloudRain },
  { name: 'Mountain Wind', file: '/music/Rain.opus', icon: Wind },
  { name: 'Ocean Waves', file: '/music/Ocean.opus', icon: Waves },
  { name: 'Warm Fire', file: '/music/Fire.opus', icon: Flame },
];

const barHeights = [6, 14, 22, 12, 26, 16, 8, 20, 10];

export default function Soundscapes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLooping, setIsLooping] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const activeSound = sounds[activeIndex];

  // Pause audio when section is out of frame
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && playing) {
          setPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [playing]);

  // Initialize and handle audio play/pause/track change
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(activeSound.file);
      audioRef.current.loop = isLooping;
    } else {
      audioRef.current.src = activeSound.file;
      audioRef.current.loop = isLooping;
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      if (!isLooping) {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [activeIndex]);

  // Handle play/pause state change
  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(() => setPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  // Handle loop toggle
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  const handlePlayPause = () => {
    setPlaying((prev) => !prev);
  };

  const handleSelectSound = (index: number) => {
    if (index === activeIndex) {
      setPlaying((prev) => !prev);
    } else {
      setActiveIndex(index);
      setPlaying(true);
    }
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % sounds.length);
    setPlaying(true);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + sounds.length) % sounds.length);
    setPlaying(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && audioRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress((newTime / audioRef.current.duration) * 100);
    }
  };

  return (
    <section ref={sectionRef} id="features" className="relative bg-zen-deep py-24 md:py-36 overflow-hidden">
      {/* misty texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(111,157,118,0.25) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 85% 70%, rgba(185,216,139,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[12px] tracking-[0.2em] text-zen-accent/80 font-medium mb-5 block">
            AMBIENT SOUNDSCAPES
          </span>
          <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.15] text-zen-mist mb-6 max-w-[440px]">
            Make focus feel like a place.
          </h2>
          <p className="text-zen-sage/85 text-[16px] md:text-lg leading-relaxed max-w-[420px] mb-10">
            Choose a calming soundscape that helps your mind settle in — from forest rain and mountain winds to calming ocean waves and warm fire sounds.
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-[400px] mb-8">
            {sounds.map((sound, i) => {
              const Icon = sound.icon;
              const isActive = activeIndex === i;
              return (
                <motion.button
                  key={sound.name}
                  onClick={() => handleSelectSound(i)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`min-h-[44px] flex items-center gap-3 px-4 py-3 rounded-full border transition-colors duration-300 ${
                    isActive
                      ? 'bg-zen-accent/15 border-zen-accent/50 text-zen-accent'
                      : 'bg-white/5 border-white/10 text-zen-sage/80 hover:border-white/25 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={1.6} />
                  <span className="text-[14px]">{sound.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Mini player */}
          <div className="max-w-[400px] rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeSound.name}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-zen-mist text-[14px] font-medium"
                >
                  {activeSound.name}
                </motion.p>
              </AnimatePresence>
              <button
                onClick={() => setIsLooping((l) => !l)}
                title={isLooping ? 'Looping enabled' : 'Looping disabled'}
                aria-label={isLooping ? 'Disable looping' : 'Enable looping'}
                className="transition-opacity"
              >
                <Repeat
                  className={`w-3.5 h-3.5 ${isLooping ? 'text-zen-accent' : 'text-zen-sage/65'}`}
                  strokeWidth={1.6}
                />
              </button>
            </div>
            {/* Progress bar */}
            <div
              onClick={handleProgressClick}
              className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-3 cursor-pointer relative"
            >
              <motion.div
                className="h-full bg-zen-accent rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="flex items-center justify-center gap-5">
              <button
                onClick={handlePrev}
                title="Previous soundscape"
                aria-label="Previous soundscape"
              >
                <SkipBack className="w-4 h-4 text-zen-sage hover:text-zen-mist transition-colors" strokeWidth={1.6} />
              </button>
              <motion.button
                onClick={handlePlayPause}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label={playing ? 'Pause soundscape' : 'Play soundscape'}
                className="w-10 h-10 rounded-full bg-zen-accent flex items-center justify-center cursor-pointer"
              >
                {playing ? (
                  <Pause className="w-4 h-4 text-zen-deep" strokeWidth={2} />
                ) : (
                  <Play className="w-4 h-4 text-zen-deep ml-0.5" strokeWidth={2} />
                )}
              </motion.button>
              <button
                onClick={handleNext}
                title="Next soundscape"
                aria-label="Next soundscape"
              >
                <SkipForward className="w-4 h-4 text-zen-sage hover:text-zen-mist transition-colors" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px]">
            {[0, 1, 2].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 rounded-full border border-zen-accent/15"
                style={{ scale: 1 - ring * 0.18 }}
                animate={playing ? { scale: [1 - ring * 0.18, 1 - ring * 0.18 + 0.02, 1 - ring * 0.18] } : {}}
                transition={{ duration: 3 + ring, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[46%] h-[46%] rounded-full bg-gradient-to-br from-zen-moss/40 to-zen-forest/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                <svg width="72" height="32" viewBox="0 0 72 32" className="opacity-90">
                  {barHeights.map((h, i) => (
                    <motion.rect
                      key={i}
                      x={i * 8}
                      width="4"
                      rx="2"
                      fill="#B9D88B"
                      initial={{ height: h, y: 16 - h / 2 }}
                      animate={
                        playing
                          ? { height: [h, h * 1.8, h * 0.5, h], y: [16 - h / 2, 16 - (h * 1.8) / 2, 16 - (h * 0.5) / 2, 16 - h / 2] }
                          : { height: h, y: 16 - h / 2 }
                      }
                      transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
