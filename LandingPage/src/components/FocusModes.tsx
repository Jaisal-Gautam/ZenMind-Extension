import { useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Feather, BookOpen, Sliders } from 'lucide-react';

const modes = [
  {
    id: 'deep',
    icon: Moon,
    name: 'Deep Focus',
    description: 'Blocks distracting websites and notifications.',
  },
  {
    id: 'gentle',
    icon: Feather,
    name: 'Gentle Focus',
    description: 'Reduces interruptions while keeping essentials available.',
  },
  {
    id: 'study',
    icon: BookOpen,
    name: 'Study Mode',
    description: 'Creates a distraction-free space for learning.',
  }
];

const presets = ['25 min', '50 min', '90 min', '120 min'];

export default function FocusModes() {
  const [activeMode, setActiveMode] = useState<string>('deep');
  const [selectedPreset, setSelectedPreset] = useState<string>('25 min');

  return (
    <section id="focus-modes" className="bg-zen-cream py-24 md:py-36">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="md:sticky md:top-32"
        >
          <span className="text-[12px] tracking-[0.2em] text-zen-forest/70 font-medium mb-5 block">
            FOCUS MODES
          </span>
          <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.15] text-zen-deep mb-6 max-w-[420px]">
            A focus mode for every kind of deep work.
          </h2>
          <p className="text-zen-muted text-[16px] md:text-lg leading-relaxed max-w-[400px] mb-8">
            Not every session calls for the same kind of quiet. Choose the mode that matches your work, and let ZenMind hold the boundary for you.
          </p>

          <div>
            <p className="text-[13px] text-zen-muted mb-3">Or start a quick preset</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => {
                const isSelected = selectedPreset === preset;
                return (
                  <motion.button
                    key={preset}
                    onClick={() => setSelectedPreset(preset)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`min-h-[40px] px-4 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer ${isSelected
                        ? 'bg-zen-deep text-zen-accent border border-zen-deep shadow-md shadow-zen-deep/15'
                        : 'text-zen-ink/80 border border-zen-sage bg-white/60 hover:border-zen-forest/40 hover:bg-white'
                      }`}
                  >
                    {preset}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {modes.map((mode, i) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;
            return (
              <motion.div
                key={mode.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveMode(mode.id)}
                className={`group rounded-2xl px-7 py-6 transition-all duration-200 ease-in cursor-pointer ${isActive
                  ? 'bg-zen-deep text-zen-sage shadow-xl shadow-zen-deep/15'
                  : 'bg-white/70 text-zen-ink border border-zen-sage/60 hover:border-zen-forest/40 hover:shadow-lg hover:shadow-zen-forest/5'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <motion.span
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${isActive ? 'bg-white/10' : 'bg-zen-mist'
                      }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? 'text-zen-accent' : 'text-zen-forest'}`}
                      strokeWidth={1.6}
                    />
                  </motion.span>
                  <div>
                    <h3 className={`text-[17px] font-medium mb-1 ${isActive ? 'text-zen-mist' : 'text-zen-ink'}`}>
                      {mode.name}
                    </h3>
                    <p className={`text-[15px] leading-relaxed ${isActive ? 'text-zen-sage/90' : 'text-zen-muted'}`}>
                      {mode.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
