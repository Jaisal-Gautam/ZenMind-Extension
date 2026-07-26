import { motion } from 'motion/react';
import { Sparkles, Shield, Compass, Globe } from 'lucide-react';
import { installZenMind } from '@/lib/chromeStore';

const floatingDots = [
  { top: '15%', left: '10%', size: 'w-2 h-2', delay: 0 },
  { top: '25%', left: '85%', size: 'w-1.5 h-1.5', delay: 0.8 },
  { top: '75%', left: '15%', size: 'w-1.5 h-1.5', delay: 1.5 },
  { top: '80%', left: '88%', size: 'w-2 h-2', delay: 0.4 },
];

const highlights = [
  { icon: Shield, text: 'Privacy-first extension' },
  { icon: Compass, text: '100% Free forever' },
  { icon: Sparkles, text: 'Instant setup' },
];

export default function FinalCta() {
  return (
    <section className="px-6 py-20 md:py-32 bg-zen-cream relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-[1080px] mx-auto rounded-[40px] bg-gradient-to-b from-[#133531] via-zen-deep to-[#091C1B] overflow-hidden px-8 py-20 md:py-28 text-center border border-zen-moss/30 shadow-2xl shadow-zen-deep/30"
      >
        {/* Ambient Radial Glows */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-50 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(185,216,139,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(111,157,118,0.25) 0%, transparent 70%)',
          }}
        />

        {/* Floating Light Particles */}
        {floatingDots.map((dot, i) => (
          <motion.span
            key={i}
            className={`absolute ${dot.size} rounded-full bg-zen-accent opacity-60`}
            style={{
              top: dot.top,
              left: dot.left,
              boxShadow: '0 0 10px 2px rgba(185,216,139,0.7)',
            }}
            animate={{ opacity: [0.3, 0.9, 0.3], y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
          />
        ))}

        <div className="relative z-10 max-w-[620px] mx-auto">
          {/* Header pill */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zen-accent/15 border border-zen-accent/30 text-[12px] tracking-[0.2em] text-zen-accent font-medium mb-7">
            <Sparkles className="w-3.5 h-3.5" /> QUIET THE INTERNET TODAY
          </span>

          <h2 className="font-display text-3xl md:text-[3rem] leading-[1.12] text-zen-mist mb-6 font-normal">
            Your attention deserves a quieter internet.
          </h2>

          <p className="text-zen-sage/85 text-[16px] md:text-lg leading-relaxed mb-10 max-w-[480px] mx-auto">
            Install ZenMind with one click and create space for the deep work that matters most.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <motion.button
              onClick={installZenMind}
              whileHover={{ scale: 1.04, boxShadow: '0 0 25px 5px rgba(185,216,139,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="min-h-[52px] px-9 py-4 rounded-full bg-zen-accent text-zen-deep font-semibold text-[16px] hover:bg-white transition-all duration-300 shadow-xl shadow-zen-accent/20 flex items-center gap-3 group cursor-pointer"
            >
              <Globe className="w-5 h-5 text-zen-deep group-hover:scale-110 transition-transform" />
              Add ZenMind to Chrome
            </motion.button>

          </div>

          {/* Highlights Badge Pills */}
          <div className="pt-6 border-t border-zen-sage/15 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-2 text-zen-sage/75 text-[13px]">
                  <Icon className="w-4 h-4 text-zen-accent" strokeWidth={1.75} />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
