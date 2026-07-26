import { motion } from 'motion/react';
import { TrendingUp, Clock, ShieldOff, Sprout } from 'lucide-react';

export default function Insights() {
  return (
    <section id="insights" className="bg-zen-mist py-24 md:py-36">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[12px] tracking-[0.2em] text-zen-forest/70 font-medium mb-5 block">
            FOCUS INSIGHTS
          </span>
          <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.15] text-zen-deep mb-5">
            See what your focus is becoming.
          </h2>
          <p className="text-zen-muted text-[16px] md:text-lg leading-relaxed max-w-[440px] mx-auto">
            ZenMind turns your sessions into gentle, useful insights — not pressure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="rounded-[28px] border border-white/60 bg-white/60 backdrop-blur-xl shadow-xl shadow-zen-forest/5 p-7 md:p-10 mb-6"
        >
          <div className="grid md:grid-cols-3 gap-8 md:gap-6 mb-10">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-full bg-zen-forest/10 flex items-center justify-center shrink-0">
                <Clock className="w-[18px] h-[18px] text-zen-forest" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-zen-muted text-[13px] mb-1">Focused Time</p>
                <p className="font-display text-2xl text-zen-deep">8m</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-full bg-zen-forest/10 flex items-center justify-center shrink-0">
                <TrendingUp className="w-[18px] h-[18px] text-zen-forest" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-zen-muted text-[13px] mb-1">Peak Focus Window</p>
                <p className="font-display text-2xl text-zen-deep">10:00–11:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-full bg-zen-forest/10 flex items-center justify-center shrink-0">
                <ShieldOff className="w-[18px] h-[18px] text-zen-forest" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-zen-muted text-[13px] mb-1">Distractions Avoided</p>
                <p className="font-display text-2xl text-zen-deep">4</p>
              </div>
            </div>
          </div>

          {/* Line Chart: Focus Throughout the Day */}
          <div className="mb-6 pt-2">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <p className="text-[15px] font-medium text-zen-deep">Focus Throughout the Day</p>
              <div className="text-right">
                <span className="text-[11px] text-zen-muted block">Peak Focus Hour</span>
                <span className="text-[13px] font-semibold text-zen-forest">10 PM – 11 PM</span>
              </div>
            </div>

            <div className="relative bg-zen-mist/40 rounded-2xl border border-zen-sage/30 p-4 pt-6 pb-3">
              <div className="flex gap-3 items-stretch">
                {/* Y-Axis Labels */}
                <div className="flex flex-col justify-between text-[10px] text-zen-muted/70 font-mono text-right shrink-0 h-32 py-1 pr-1 border-r border-zen-sage/30">
                  <span>60m</span>
                  <span>45m</span>
                  <span>30m</span>
                  <span>15m</span>
                  <span>0m</span>
                </div>

                {/* Line Chart Content Area */}
                <div className="flex-1 relative flex flex-col justify-between overflow-hidden">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                    <div className="border-b border-dashed border-zen-sage/40 w-full" />
                    <div className="border-b border-dashed border-zen-sage/40 w-full" />
                    <div className="border-b border-dashed border-zen-sage/40 w-full" />
                    <div className="border-b border-dashed border-zen-sage/40 w-full" />
                    <div className="border-b border-zen-sage/40 w-full" />
                  </div>

                  {/* SVG Chart Path */}
                  <svg className="w-full h-32 overflow-visible relative z-10" viewBox="0 0 1000 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#285C4D" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#285C4D" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <motion.path
                      d="M 0,110 L 320,110 C 350,110 370,40 390,40 C 410,40 430,90 450,90 C 470,90 490,25 520,25 C 550,25 580,110 630,110 C 660,110 680,20 720,20 C 760,20 790,60 810,60 C 830,60 850,110 880,110 C 920,110 930,15 960,15 L 1000,110 L 1000,110 L 0,110 Z"
                      fill="url(#focusGradient)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />

                    {/* Smooth Curve Line */}
                    <motion.path
                      d="M 0,110 L 320,110 C 350,110 370,40 390,40 C 410,40 430,90 450,90 C 470,90 490,25 520,25 C 550,25 580,110 630,110 C 660,110 680,20 720,20 C 760,20 790,60 810,60 C 830,60 850,110 880,110 C 920,110 930,15 960,15 L 1000,110"
                      fill="none"
                      stroke="#285C4D"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />

                    {/* Peak & Session Data Points */}
                    <circle cx="390" cy="40" r="4" fill="#FAFBF7" stroke="#285C4D" strokeWidth="2" />
                    <circle cx="520" cy="25" r="4" fill="#FAFBF7" stroke="#285C4D" strokeWidth="2" />
                    <circle cx="720" cy="20" r="4.5" fill="#FAFBF7" stroke="#285C4D" strokeWidth="2.5" />
                    <circle cx="810" cy="60" r="4" fill="#FAFBF7" stroke="#285C4D" strokeWidth="2" />
                    <circle cx="960" cy="15" r="4.5" fill="#FAFBF7" stroke="#285C4D" strokeWidth="2.5" />
                  </svg>

                  {/* Time X-Axis */}
                  <div className="flex justify-between text-[9px] text-zen-muted/80 font-mono tracking-tighter pt-2 border-t border-zen-sage/30 overflow-x-auto mt-1">
                    {['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'].map(
                      (time) => (
                        <span key={time}>{time}</span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Focus Forest gamification */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-[28px] border border-white/60 bg-white/60 backdrop-blur-xl shadow-xl shadow-zen-forest/5 p-7 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-center"
        >
          <div className="flex justify-center">
            <div className="relative w-24 h-24 rounded-full bg-zen-forest/10 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sprout className="w-10 h-10 text-zen-forest" strokeWidth={1.4} />
              </motion.div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <p className="text-[13px] tracking-[0.14em] text-zen-forest/70 font-medium">
                YOUR FOCUS FOREST — LEVEL 1 · SEED
              </p>
              <p className="text-[12px] text-zen-muted">43 / 100 XP (1 min = 5 XP)</p>
            </div>
            <p className="text-zen-muted text-[14px] leading-relaxed mb-4 max-w-[520px]">
              Every great forest begins with a single seed. 8m total focus time earned 43 XP today.
            </p>
            <div className="h-2 rounded-full bg-zen-sage/40 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-zen-moss to-zen-accent origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 0.43 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
