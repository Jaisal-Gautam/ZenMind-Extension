import { type SVGProps } from "react";
import { motion } from "motion/react";
import { Mail } from "lucide-react";

const featureLinks = [
  { label: "Focus Modes", href: "/#focus-modes" },
  { label: "Website Blocking", href: "/#features" },
  { label: "Soundscapes", href: "/#features" },
  { label: "Analytics & Insights", href: "/#insights" },
  { label: "Pricing & Support", href: "/#pricing" },
];

const fireflies = [
  { top: "22%", left: "12%", delay: 0, size: "w-2 h-2" },
  { top: "36%", left: "68%", delay: 0.6, size: "w-1.5 h-1.5" },
  { top: "18%", left: "42%", delay: 1.2, size: "w-2 h-2" },
  { top: "44%", left: "84%", delay: 1.8, size: "w-1.5 h-1.5" },
  { top: "52%", left: "28%", delay: 0.9, size: "w-2 h-2" },
  { top: "30%", left: "90%", delay: 1.5, size: "w-1.5 h-1.5" },
];

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { icon: XIcon, label: "X (Twitter)", href: "https://x.com/jaisal_tech", text: "@jaisal_tech" },
  { icon: Mail, label: "Email", href: "mailto:jaisal@zen-mind.dev", text: "jaisal@zen-mind.dev" }
];

export default function Footer() {
  return (
    <footer className="relative bg-zen-deep overflow-hidden">
      {/* Mountain illustration header with subtle parallax depth */}
      <div className="relative h-[300px] md:h-[380px] overflow-hidden bg-gradient-to-b from-zen-cream via-[#DCE8DC] to-[#8FA392]">
        <svg
          viewBox="0 0 1440 360"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-60 blur-[1px]"
        >
          <path
            d="M0,180 C220,110 380,220 560,150 C760,80 900,200 1100,140 C1260,95 1360,170 1440,130 L1440,360 L0,360 Z"
            fill="#C9D8C7"
          />
        </svg>
        <svg
          viewBox="0 0 1440 360"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-80"
        >
          <path
            d="M0,220 C240,170 420,250 640,200 C820,160 960,230 1160,190 C1300,165 1380,210 1440,195 L1440,360 L0,360 Z"
            fill="#4F795B"
          />
        </svg>
        <svg
          viewBox="0 0 1440 360"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M0,260 C260,230 440,280 680,255 C860,236 1000,270 1200,250 C1320,238 1380,258 1440,250 L1440,360 L0,360 Z"
            fill="#0F2928"
          />
        </svg>

        {fireflies.map((f, i) => (
          <motion.span
            key={i}
            className={`absolute ${f.size} rounded-full bg-zen-accent`}
            style={{
              top: f.top,
              left: f.left,
              boxShadow: "0 0 12px 3px rgba(185,216,139,0.85)",
            }}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -12, 0], scale: [0.9, 1.2, 0.9] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: f.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-zen-deep" />
      </div>

      {/* Main Footer Body */}
      <div className="bg-zen-deep px-6 md:px-12 pb-12 pt-2 relative z-10">
        <div className="max-w-[1140px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-10 items-start">
            {/* Brand column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5 flex flex-col items-start"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 p-1 shadow-inner">
                  <img
                    src="/icon16.png"
                    alt="ZenMind Logo"
                    className="w-full h-full object-contain"
                  />
                </span>
                <span className="font-display text-2xl text-zen-mist tracking-tight">
                  ZenMind
                </span>
              </div>
              <p className="text-zen-sage/80 text-[14.5px] leading-relaxed max-w-[300px] mb-6">
                A calm, mindful browser companion crafted to protect your focus and bring peace to deep work.
              </p>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zen-forest/40 border border-zen-sage/20 text-[12px] text-zen-accent">
                <span className="w-2 h-2 rounded-full bg-zen-accent animate-pulse" /> Free & Privacy First
              </span>
            </motion.div>

            {/* Quick Links Column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-4"
            >
              <h3 className="text-zen-mist text-sm font-medium tracking-wide uppercase text-[12px] text-zen-accent/80 mb-5">
                Explore Features
              </h3>
              <ul className="flex flex-col gap-3">
                {featureLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-zen-sage/75 text-[14px] hover:text-zen-accent transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zen-sage/30 group-hover:bg-zen-accent group-hover:scale-125 transition-all" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Connect Column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-3"
            >
              <h3 className="text-zen-mist text-sm font-medium tracking-wide uppercase text-[12px] text-zen-accent/80 mb-5">
                Connect & Support
              </h3>
              <p className="text-zen-sage/75 text-[13.5px] leading-relaxed mb-4">
                Follow updates & connect with the builder on X.
              </p>
              <div className="flex justify-start flex-col  gap-3">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-fit min-w-[220px] px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-zen-sage/90 hover:text-zen-mist hover:bg-white/10 hover:border-zen-accent/40 transition-all duration-300 group"
                    >
                      <Icon className="w-4 h-4 text-zen-accent group-hover:scale-110 transition-transform" />
                      <span className="text-[13.5px] font-medium">{s.text}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="h-px w-full bg-zen-sage/15 my-4" />

          {/* Sub-footer bottom bar */}
          <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-zen-sage/50 text-[13px]">
                © 2026 ZenMind. All rights reserved.
              </p>
              <div className="flex items-center gap-3 text-zen-sage/50 text-[13px]">
                <a href="/privacy" className="hover:text-zen-mist transition-colors">Privacy</a>
                <span>•</span>
                <a href="/terms" className="hover:text-zen-mist transition-colors">Terms</a>
                <span>•</span>
                <a href="/contact" className="hover:text-zen-mist transition-colors">Contact</a>
              </div>
            </div>
            <p className="text-zen-sage/50 text-[13px] flex items-center gap-1.5">
              Made with care for calmer workdays. 🌿
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
