import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { installZenMind } from '@/lib/chromeStore';

const links = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Focus modes', href: '/#focus-modes' },
  { label: 'Insights', href: '/#insights' },
  { label: 'Pricing', href: '/#pricing' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = useCallback((href: string) => {
    setOpen(false);
    const id = href.replace('/#', '');
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.location.href = href;
    }
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.replace('/#', '');
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="max-w-[1360px] mx-auto flex items-center justify-between px-6 md:px-10 py-6">
        <motion.a
          href="/"
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#b6cdb9] backdrop-blur-sm border border-white/20 overflow-hidden">
            <img src="/icon16.png" alt="ZenMind Logo" className="w-10 h-10 object-cover" />
          </span>
          <span className="font-display text-xl tracking-wide text-zen-deep">
            ZenMind
          </span>
        </motion.a>

        <div className="hidden md:flex items-center gap-9">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative text-[15px] text-zen-ink/80 hover:text-zen-ink transition-colors duration-300 group"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-zen-forest transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <motion.div
          className="flex items-center gap-3 md:gap-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >

          <motion.button
            onClick={installZenMind}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="min-h-[44px] px-5 rounded-full bg-zen-deep text-zen-mist text-[15px] font-medium hover:bg-zen-ink transition-colors duration-300 shadow-sm"
          >
            Get ZenMind free
          </motion.button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full text-zen-ink"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-zen-cream/95 backdrop-blur-md border-t border-zen-sage/40"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="min-h-[44px] flex items-center text-[15px] text-zen-ink/85 text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

