
import { motion } from 'motion/react';
import { Check, Coffee, Heart, Sparkles, ShieldCheck } from 'lucide-react';
import { installZenMind,tip } from '@/lib/chromeStore';

export default function Pricing() {

  const plans = [
    {
      name: 'Free Edition',
      price: '$0',
      period: 'free forever',
      badge: '100% FREE',
      badgeIcon: ShieldCheck,
      description: 'Everything is included out of the box. No paywalls, no trial limits, no hidden fees.',
      features: [
        'Smart website & category blocking',
        'All ambient soundscapes & music',
        'Complete focus analytics & tracking',
        'Focus Forest level & XP rewards',
        'Unlimited focus modes & rituals',
      ],
      cta: 'Install Extension Free',
      action: installZenMind,
      featured: false,
      isCoffee: false,
    },
    {
      name: 'Support ZenMind',
      price: '$1',
      period: 'optional coffee',
      badge: 'INDIE DEVELOPER',
      badgeIcon: Heart,
      description: 'Love using ZenMind? Support the independent creator and help fund future features.',
      features: [
        'Keep ZenMind 100% free & ad-free for everyone',
        'Fund new high-quality soundscapes & ambient tracks',
        'Support continuous updates & browser compatibility',
      ],
      cta: 'Ko-fi Page',
      action: tip,
      featured: true,
      isCoffee: true,
    },
  ];
  return (
    <section id="pricing" className="bg-zen-cream py-24 md:py-36 relative overflow-hidden">
      <div className="max-w-[960px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zen-forest/10 text-[12px] tracking-[0.2em] text-zen-forest font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" /> SIMPLE & FAIR
          </span>
          <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.15] text-zen-deep mb-5">
            Everything is Free.
          </h2>
          <p className="text-zen-muted text-[16px] md:text-lg leading-relaxed max-w-[460px] mx-auto">
            No subscriptions. No locked features. If ZenMind brings peace to your work, you can support development on our Ko-fi page.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {plans.map((plan, i) => {
            const BadgeIcon = plan.badgeIcon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className={`rounded-[32px] p-8 md:p-9 flex flex-col transition-all duration-300 ${plan.featured
                    ? 'bg-gradient-to-b from-[#133531] via-zen-deep to-[#0A1F1E] text-zen-mist shadow-2xl shadow-zen-deep/30 border border-zen-moss/30 relative overflow-hidden'
                    : 'bg-white/80 border border-zen-sage/70 text-zen-ink backdrop-blur-xl shadow-xl shadow-zen-forest/5'
                  }`}
              >
                {plan.featured && (
                  <>
                    <div
                      className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-40 blur-2xl"
                      style={{ background: 'radial-gradient(circle, #B9D88B 0%, transparent 70%)' }}
                    />
                    <div
                      className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full pointer-events-none opacity-20 blur-2xl"
                      style={{ background: 'radial-gradient(circle, #6F9D76 0%, transparent 70%)' }}
                    />
                  </>
                )}

                <div className="relative flex flex-col h-full z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-[18px] font-medium tracking-wide ${plan.featured ? 'text-zen-mist' : 'text-zen-ink'}`}>
                      {plan.name}
                    </h3>
                    <span
                      className={`text-[11px] px-3 py-1 rounded-full font-medium tracking-wider uppercase flex items-center gap-1.5 ${plan.isCoffee
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : 'bg-zen-forest/10 text-zen-forest border border-zen-forest/20'
                        }`}
                    >
                      <BadgeIcon className="w-3 h-3" /> {plan.badge}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-display text-4xl md:text-[2.75rem]">{plan.price}</span>
                    <span className={`text-[13px] ${plan.featured ? 'text-zen-sage/70' : 'text-zen-muted'}`}>
                      / {plan.period}
                    </span>
                  </div>

                  <p className={`text-[14px] leading-relaxed mb-7 ${plan.featured ? 'text-zen-sage/85' : 'text-zen-muted'}`}>
                    {plan.description}
                  </p>

                  <div className="w-full h-px bg-current opacity-10 mb-7" />

                  <ul className="flex flex-col gap-3.5 mb-9">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-[14px] leading-snug">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.featured ? 'bg-zen-accent/20 text-zen-accent' : 'bg-zen-forest/10 text-zen-forest'
                            }`}
                        >
                          <Check className="w-3 h-3" strokeWidth={2.5} />
                        </span>
                        <span className={plan.featured ? 'text-zen-sage/90' : 'text-zen-ink/85'}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={plan.action}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-auto min-h-[48px] w-full rounded-full font-medium text-[15px] flex items-center justify-center gap-2.5 shadow-md transition-all duration-300 ${plan.featured
                        ? 'bg-amber-400 text-amber-950 hover:bg-amber-300 font-semibold shadow-amber-400/20'
                        : 'bg-zen-deep text-zen-mist hover:bg-zen-ink shadow-zen-deep/15'
                      }`}
                  >
                    {plan.isCoffee && <Coffee className="w-4 h-4 fill-current" />}
                    {plan.cta}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
