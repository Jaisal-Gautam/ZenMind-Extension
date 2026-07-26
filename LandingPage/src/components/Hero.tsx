import { motion } from 'motion/react';
import { ArrowDown, Circle, ShieldCheck, Volume2, Clock } from 'lucide-react';
import { installZenMind } from '@/lib/chromeStore';

const trust = [
  { label: 'Block distractions', icon: ShieldCheck },
  { label: 'Play ambient sounds', icon: Volume2 },
  { label: 'Track focus time', icon: Clock },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center">
      {/* Sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #FBF8EF 0%, #F5F0E2 28%, #EAF0E4 52%, #D9E6D8 72%, #C9D8C7 100%)',
        }}
      />

      {/* Sun haze */}
      <div
        className="absolute left-1/2 top-[14%] -translate-x-1/2 w-[520px] h-[520px] rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgba(255,250,235,0.9) 0%, rgba(255,250,235,0.25) 45%, rgba(255,250,235,0) 70%)',
        }}
      />

      {/* Mountain layers */}
      <div className="absolute -left-[6%] -right-[6%] bottom-0 h-[62%] motion-safe:animate-drift-slower">
        <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="w-full h-full opacity-[0.55] blur-[2px]">
          <path
            d="M-100,220 C180,140 320,260 480,190 C660,110 780,240 960,170 C1140,100 1280,210 1540,150 L1540,420 L-100,420 Z"
            fill="#C9D8C7"
          />
        </svg>
      </div>

      <div className="absolute -left-[6%] -right-[6%] bottom-0 h-[52%] motion-safe:animate-drift-slow">
        <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="w-full h-full opacity-[0.7] blur-[1.5px]">
          <path
            d="M-100,260 C200,190 340,290 520,230 C700,170 820,270 1020,210 C1200,160 1300,240 1540,200 L1540,420 L-100,420 Z"
            fill="#8FB394"
          />
        </svg>
      </div>

      <div className="absolute -left-[6%] -right-[6%] bottom-0 h-[38%] motion-safe:animate-drift-slower">
        <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="w-full h-full opacity-90 blur-[0.5px]">
          <path
            d="M-100,300 C220,250 360,320 560,270 C740,225 880,310 1080,260 C1240,222 1340,280 1540,250 L1540,420 L-100,420 Z"
            fill="#5B8567"
          />
        </svg>
      </div>

      <div className="absolute -left-[6%] -right-[6%] bottom-0 h-[24%]">
        <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M-100,340 C260,310 400,360 620,330 C800,305 940,350 1140,320 C1280,300 1360,330 1540,320 L1540,420 L-100,420 Z"
            fill="#285C4D"
          />
        </svg>
      </div>

      {/* Bottom gradient transition into next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-zen-cream" />

      {/* Content */}
      <div className="relative z-10 max-w-[880px] mx-auto px-6 pt-40 md:pt-48 pb-24 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[12px] md:text-[13px] tracking-[0.22em] text-zen-forest/80 font-medium mb-6"
        >
          YOUR CALMER CORNER OF THE INTERNET
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-[2.5rem] leading-[1.1] md:text-6xl md:leading-[1.08] text-zen-deep mb-6"
        >
          Less switching.
          <br />
          More deep work.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-zen-muted text-[17px] md:text-lg leading-relaxed max-w-[520px] mb-10"
        >
          ZenMind helps you block distractions, settle into focus, and understand how you spend your time online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center gap-4 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.button
              onClick={installZenMind}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="min-h-[44px] px-7 py-3.5 rounded-full bg-zen-deep text-zen-mist font-medium hover:bg-zen-ink transition-colors duration-300 shadow-lg shadow-zen-deep/10"
            >
              Add to Chrome — It&rsquo;s free
            </motion.button>
            <motion.a
              href="#how-it-works"
              whileHover={{ x: 2 }}
              className="text-[15px] text-zen-forest hover:text-zen-ink underline underline-offset-4 decoration-zen-forest/30 transition-colors duration-300"
            >
              See how it works
            </motion.a>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {trust.map((item) => {
            const Icon = item.icon;
            return (
              <span
                key={item.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-zen-sage/60 backdrop-blur-sm text-[13px] text-zen-forest/90"
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                {item.label}
              </span>
            );
          })}
        </motion.div>

        {/* Extension preview card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          whileHover={{ y: -4 }}
          className="w-full max-w-[400px] rounded-3xl border border-white/20 bg-zen-deep/70 backdrop-blur-xl px-7 py-7 shadow-2xl shadow-zen-deep/20 text-left"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Circle className="w-2 h-2 fill-zen-accent text-zen-accent" />
              </motion.span>
              <span className="text-zen-sage text-[13px] tracking-wide font-medium">Deep Focus active</span>
            </div>
            <span className="text-[12px] px-2.5 py-1 rounded-full bg-white/10 text-zen-sage">
              12 sites blocked
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#B9D88B"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * 0.32 }}
                  transition={{ duration: 1.4, delay: 0.6, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-zen-mist font-display text-lg">48:22</span>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-zen-mist/90 text-[14px] mb-1">Session</p>
              <p className="text-zen-sage text-[13px] mb-4">Focused reading &amp; writing</p>
              <div className="flex items-center gap-2 text-zen-sage/90 text-[13px]">
                <span className="w-1.5 h-1.5 rounded-full bg-zen-accent animate-pulse" />
                Forest Rain — playing
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2 pb-10 text-zen-forest/70">
        <span className="text-[11px] tracking-[0.18em]">SCROLL TO EXPLORE</span>
        <ArrowDown className="w-4 h-4 animate-bounce" strokeWidth={1.5} />
      </div>
    </section>
  );
}
