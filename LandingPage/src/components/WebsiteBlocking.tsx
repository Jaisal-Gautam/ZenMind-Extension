import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Feather, Moon, Lock, Users2, Gamepad2, ShoppingBag, Clapperboard, MessageCircle } from 'lucide-react';

type ModeKey = 'normal' | 'deep' | 'strict';

const modes: Record<
  ModeKey,
  { label: string; icon: typeof Feather; description: string; accent: string; sites: string[] }
> = {
  normal: {
    label: 'Normal Mode',
    icon: Feather,
    description: 'A balanced list for everyday tasks. Always blocked while Website Blocking is enabled.',
    accent: '#6F9D76',
    sites: ['twitter.com', 'reddit.com', 'youtube.com'],
  },
  deep: {
    label: 'Deep Focus',
    icon: Moon,
    description: 'A high-intensity list for deep work. Blocked only during Deep Focus sessions.',
    accent: '#285C4D',
    sites: ['news.ycombinator.com', 'instagram.com'],
  },
  strict: {
    label: 'Strict Mode',
    icon: Lock,
    description: 'Total lockdown. Only whitelisted essential sites are allowed.',
    accent: '#B9776B',
    sites: ['everything except your whitelist'],
  },
};

const categories = [
  {
    name: 'Social Media',
    icon: Users2,
    domains: [
      'instagram.com',
      'facebook.com',
      'x.com',
      'twitter.com',
      'threads.net',
      'reddit.com',
      'snapchat.com',
      'linkedin.com',
      'pinterest.com',
      'tumblr.com',
    ],
    on: true,
  },
  {
    name: 'Entertainment',
    icon: Clapperboard,
    domains: [
      'youtube.com',
      'netflix.com',
      'primevideo.com',
      'disneyplus.com',
      'twitch.tv',
      'hotstar.com',
      'hulu.com',
      'sonyliv.com',
      'zee5.com',
    ],
    on: false,
  },
  {
    name: 'Gaming',
    icon: Gamepad2,
    domains: [
      'store.steampowered.com',
      'steamcommunity.com',
      'epicgames.com',
      'roblox.com',
      'minecraft.net',
      'ea.com',
      'riotgames.com',
      'battle.net',
    ],
    on: false,
  },
  {
    name: 'Shopping',
    icon: ShoppingBag,
    domains: [
      'amazon.com',
      'amazon.in',
      'flipkart.com',
      'myntra.com',
      'ebay.com',
      'ajio.com',
      'meesho.com',
      'nykaa.com',
    ],
    on: true,
  },
  {
    name: 'Messaging',
    icon: MessageCircle,
    domains: [
      'web.whatsapp.com',
      'discord.com',
      'web.telegram.org',
      'messenger.com',
      'slack.com',
      'teams.microsoft.com',
    ],
    on: false,
  },
];

export default function WebsiteBlocking() {
  const [active, setActive] = useState<ModeKey>('deep');
  const [toggles, setToggles] = useState(() => Object.fromEntries(categories.map((c) => [c.name, c.on])));
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const activeMode = modes[active];
  const ActiveIcon = activeMode.icon;

  return (
    <section className="bg-zen-cream py-24 md:py-32">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[12px] tracking-[0.2em] text-zen-forest/70 font-medium mb-5 block">
            SMART WEBSITE BLOCKING
          </span>
          <h2 className="font-display text-3xl md:text-[2.4rem] leading-[1.15] text-zen-deep mb-5">
            Set the boundary once. ZenMind holds it.
          </h2>
          <p className="text-zen-muted text-[16px] md:text-lg leading-relaxed max-w-[440px] mx-auto">
            Choose how strict your sessions should feel, then let entire categories of distraction disappear.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="rounded-[28px] border border-zen-sage/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-zen-forest/5 p-6 md:p-8 mb-6"
        >
          <div className="flex flex-wrap gap-2 mb-8">
            {(Object.keys(modes) as ModeKey[]).map((key) => {
              const mode = modes[key];
              const Icon = mode.icon;
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`relative min-h-[44px] px-5 rounded-full text-[14px] font-medium flex items-center gap-2 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-zen-ink/70 hover:text-zen-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="blocking-tab-bg"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: mode.accent }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="relative z-10 w-4 h-4" strokeWidth={1.75} />
                  <span className="relative z-10">{mode.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl p-6 border"
              style={{ borderColor: `${activeMode.accent}40`, background: `${activeMode.accent}0D` }}
            >
              <div className="flex items-start gap-4 mb-5">
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${activeMode.accent}22` }}
                >
                  <ActiveIcon className="w-5 h-5" style={{ color: activeMode.accent }} strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-[16px] font-medium text-zen-ink mb-1">{activeMode.label}</h3>
                  <p className="text-zen-muted text-[14px] leading-relaxed">{activeMode.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeMode.sites.map((site) => (
                  <span
                    key={site}
                    className="px-3 py-1.5 rounded-full text-[13px] bg-white text-zen-ink/80 border border-zen-sage/60"
                  >
                    {site}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-[28px] border border-zen-sage/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-zen-forest/5 p-6 md:p-8"
        >
          <h3 className="text-[16px] font-medium text-zen-ink mb-1">Content categories</h3>
          <p className="text-zen-muted text-[14px] mb-6">Block an entire category of distracting websites with one click.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isOn = toggles[cat.name];
              const isExpanded = expandedCategory === cat.name;
              return (
                <div
                  key={cat.name}
                  onClick={() => setExpandedCategory(isExpanded ? null : cat.name)}
                  className="rounded-xl border border-zen-sage/50 bg-white/60 overflow-hidden cursor-pointer transition-all duration-200 hover:border-zen-forest/40 hover:shadow-md hover:bg-white/90"
                >
                  <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-zen-mist flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-zen-forest" strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="text-[14px] text-zen-ink font-medium">{cat.name}</p>
                        <p className="text-[12px] text-zen-muted">{cat.domains.length} websites</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setToggles((t) => ({ ...t, [cat.name]: !t[cat.name] }));
                      }}
                      aria-pressed={isOn}
                      aria-label={`Toggle ${cat.name} blocking`}
                      className="relative w-11 h-6 rounded-full shrink-0 transition-colors duration-300"
                      style={{ backgroundColor: isOn ? '#285C4D' : '#D9E1D6' }}
                    >
                      <motion.span
                        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
                        animate={{ left: isOn ? 22 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-zen-sage/40 bg-zen-mist/40 px-4 py-3"
                      >
                        <p className="text-[11px] font-medium tracking-wider uppercase text-zen-forest/70 mb-2">
                          Included Websites
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.domains.map((site) => (
                            <span
                              key={site}
                              className="px-2.5 py-0.5 rounded-full text-[11px] bg-white/90 text-zen-ink/80 border border-zen-sage/50"
                            >
                              {site}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
