import { motion } from 'motion/react';
import { Compass, Wind, LineChart } from 'lucide-react';

const steps = [
  {
    icon: Compass,
    title: 'Choose a focus mode',
    description: 'Select Deep Focus, Strict Mode or Study Mode, ',
  },
  {
    icon: Wind,
    title: 'ZenMind clears the noise',
    description: 'Distracting sites are blocked while your ambient soundscape begins.',
  },
  {
    icon: LineChart,
    title: 'Review your progress',
    description: 'See focus sessions, time saved, and browsing patterns.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-zen-cream py-24 md:py-32">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[12px] tracking-[0.2em] text-zen-forest/70 font-medium mb-5 block">
            HOW IT WORKS
          </span>
          <h2 className="font-display text-3xl md:text-[2.4rem] leading-[1.15] text-zen-deep">
            Three steps to a quieter session.
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-10 md:gap-8">
          {/* connecting path, desktop only */}
          <svg
            className="hidden md:block absolute top-9 left-0 w-full h-[2px] pointer-events-none"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="16"
              y1="1"
              x2="84"
              y2="1"
              stroke="#C9D8C7"
              strokeWidth="1.5"
              strokeDasharray="1 3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </svg>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <motion.span
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  className="relative z-10 w-[72px] h-[72px] rounded-full bg-zen-mist border border-zen-sage flex items-center justify-center mb-6 shadow-sm"
                >
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zen-deep text-zen-mist text-[12px] flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <Icon className="w-6 h-6 text-zen-forest" strokeWidth={1.6} />
                </motion.span>
                <h3 className="text-[17px] font-medium text-zen-ink mb-2">{step.title}</h3>
                <p className="text-zen-muted text-[15px] leading-relaxed max-w-[260px]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
