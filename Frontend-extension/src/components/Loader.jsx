import React from "react";
import { motion } from "motion/react";
function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <svg width="60" height="60" viewBox="0 0 50 50">
        <circle cx="10" cy="25" r="2" fill="#2D4B41">
          <animate
            attributeName="cy"
            values="25;20;25;30;25"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          ></animate>
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="18" cy="25" r="2" fill="#2D4B41">
          <animate
            attributeName="cy"
            values="25;20;25;30;25"
            dur="1s"
            begin="0.1s"
            repeatCount="indefinite"
          ></animate>
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1s"
            begin="0.1s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="26" cy="25" r="2" fill="#2D4B41">
          <animate
            attributeName="cy"
            values="25;20;25;30;25"
            dur="1s"
            begin="0.2s"
            repeatCount="indefinite"
          ></animate>
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1s"
            begin="0.2s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="34" cy="25" r="2" fill="#2D4B41">
          <animate
            attributeName="cy"
            values="25;20;25;30;25"
            dur="1s"
            begin="0.30000000000000004s"
            repeatCount="indefinite"
          ></animate>
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1s"
            begin="0.30000000000000004s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="42" cy="25" r="2" fill="#2D4B41">
          <animate
            attributeName="cy"
            values="25;20;25;30;25"
            dur="1s"
            begin="0.4s"
            repeatCount="indefinite"
          ></animate>
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1s"
            begin="0.4s"
            repeatCount="indefinite"
          ></animate>
        </circle>
      </svg>
      <div className="mt-4 flex items-center justify-center space-x-1">
        <span className="text-green-primary font-semibold text-lg tracking-wider transition-colors duration-300 dark:stext-neutral-primary">
          Loading
        </span>
        <motion.span
          className="text-green-primary font-semibold text-lg transition-colors duration-300 dark:text-neutral-primary"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, times: [0, 0.5, 1] }}
        >
          .
        </motion.span>
        <motion.span
          className="text-green-primary font-semibold text-lg transition-colors duration-300 dark:text-neutral-primary"
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0.15,
            times: [0, 0.5, 1],
          }}
        >
          .
        </motion.span>
        <motion.span
          className="text-green-primary font-semibold text-lg transition-colors duration-300 dark:text-neutral-primary"
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0.3,
            times: [0, 0.5, 1],
          }}
        >
          .
        </motion.span>
      </div>
    </div>
  );
}

export default Loader;
