import { useState } from 'react';
import { motion } from 'motion/react';
import { Timer, } from 'lucide-react';
import { installZenMind } from '@/lib/chromeStore';

const presets = [
  { label: '25 min', helper: 'A quick sprint' },
  { label: '50 min', helper: 'Deep, sustained work' },
  { label: '90 min', helper: 'A full flow block' },
  { label: '120 min', helper: 'For your biggest task' },
];

export default function FocusSessions() {
  const [selectedPreset, setSelectedPreset] = useState('25 min');

  return (
    <section id="focus-sessions" className="bg-zen-cream py-24 md:py-36">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="md:sticky md:top-32"
        >
          <span className="text-[12px] tracking-[0.2em] text-zen-forest/70 font-medium mb-5 block">
            FOCUS SESSIONS
          </span>
          <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.15] text-zen-deep mb-6 max-w-[420px]">
            Deep work, one click away.
          </h2>
          <p className="text-zen-muted text-[16px] md:text-lg leading-relaxed max-w-[400px] mb-8">
            Pick a duration and begin instantly, no setup required. ZenMind's Pomodoro-style presets let you slip into focus the moment you're ready.
          </p>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="min-h-[52px] px-8 rounded-full text-[14px] font-medium bg-zen-forest text-zen-cream shadow-md shadow-zen-forest/20 hover:shadow-lg hover:shadow-zen-forest/25 transition-all duration-200 cursor-pointer"
            onClick={installZenMind}
          >
            Begin your session
          </motion.button>
        </motion.div>

        <div className="flex flex-col gap-4">
          {presets.map((preset, i) => {
            const isSelected = selectedPreset === preset.label;
            return (
              <motion.div
                key={preset.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedPreset(preset.label)}
                className={`group rounded-2xl px-7 py-6 transition-all duration-200 ease-in cursor-pointer ${isSelected
                  ? 'bg-zen-deep text-zen-sage shadow-xl shadow-zen-deep/15'
                  : 'bg-white/70 text-zen-ink border border-zen-sage/60 hover:border-zen-forest/40 hover:shadow-lg hover:shadow-zen-forest/5'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <motion.span
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${isSelected ? 'bg-white/10' : 'bg-zen-mist'
                      }`}
                  >
                    <Timer
                      className={`w-5 h-5 ${isSelected ? 'text-zen-accent' : 'text-zen-forest'}`}
                      strokeWidth={1.6}
                    />
                  </motion.span>
                  <div>
                    <h3 className={`text-[17px] font-medium mb-1 ${isSelected ? 'text-zen-mist' : 'text-zen-ink'}`}>
                      {preset.label}
                    </h3>
                    <p className={`text-[15px] leading-relaxed ${isSelected ? 'text-zen-sage/90' : 'text-zen-muted'}`}>
                      {preset.helper}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <div className="flex flex-col items-center gap-2 pt-2">
            
            <p className="text-[13px] text-zen-muted">or add your custom duration</p>
          </div>
        </div>
      </div>
    </section>
  );
}