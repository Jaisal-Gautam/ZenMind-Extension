import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import icon16 from "@/assets/icon16.png";

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const navLinks = [
  { label: "Focus", href: "/" },
  { label: "Analytics", href: "/analytics" },
  { label: "Blocking", href: "/blocking" },
];

const socials = [
  { icon: XIcon, label: "X (Twitter)", href: "https://x.com/jaisal_tech", text: "@jaisal_tech" },
  { icon: Mail, label: "Email", href: "mailto:jaisal@zen-mind.dev", text: "jaisal@zen-mind.dev" },
];

const fireflies = [
  { top: "22%", left: "12%", delay: 0, size: "w-2 h-2" },
  { top: "36%", left: "68%", delay: 0.6, size: "w-1.5 h-1.5" },
  { top: "18%", left: "42%", delay: 1.2, size: "w-2 h-2" },
  { top: "44%", left: "84%", delay: 1.8, size: "w-1.5 h-1.5" },
  { top: "52%", left: "28%", delay: 0.9, size: "w-2 h-2" },
  { top: "30%", left: "90%", delay: 1.5, size: "w-1.5 h-1.5" },
];

function Footer() {
  return (
    <footer className="relative mt-6 md:mt-8 overflow-hidden w-full">
      {/* Main footer body */}
      <div className="bg-[#FFFFFF] border-t  dark:border-[#2E2E2E] dark:bg-[#151515] px-4 sm:px-6 md:px-12 pb-6 md:pb-10 pt-4 md:pt-2 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Bottom bar */}
          <div className="pt-2 md:pt-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="text-[#9DA3AF] font-semibold dark:text-[#ffffff] text-xs sm:text-[13px]">
                © 2026 ZenMind. All rights reserved.
              </p>
              <div className="flex items-center gap-2 sm:gap-3 text-[#9DA3AF] dark:text-[#ffffff] text-xs sm:text-[13px]">
                <a
                  href="https://zen-mind.dev/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2D4B41] hover:dark:text-[#6A8E24] transition-colors"
                >
                  Privacy
                </a>
                <span>•</span>
                <a
                  href="https://zen-mind.dev/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2D4B41] hover:dark:text-[#6A8E24] transition-colors"
                >
                  Terms
                </a>
                <span>•</span>
                <a
                  href="https://zen-mind.dev/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2D4B41] hover:dark:text-[#6A8E24] transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
            <p className="text-[#9DA3AF] dark:text-[#ffffff] text-xs sm:text-[13px]">
              Made with care for calmer workdays. 🌿
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;