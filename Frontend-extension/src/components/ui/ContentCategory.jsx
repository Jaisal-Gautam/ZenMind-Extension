import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { blocking_category } from "@/utils/blockingCategories";
import { addBlockedCategory, removeBlockedCategory } from "@/app/slices/blocking/blockingThunk";

function ContentCategory() {
  const dispatch = useDispatch();

  const blockedCategories = useSelector(
    (state) => state.blocking.blockedCategories,
  );

  const [expanded, setExpanded] = useState(null);

  const toggleCategory = async (id) => {
    if (blockedCategories.includes(id)) {
      await dispatch(
        removeBlockedCategory({
          category: id,
        }),
      ).unwrap();
    } else {
      await dispatch(
        addBlockedCategory({
          category: id,
        }),
      ).unwrap();
    }
  };

  return (
    <div className="rounded-2xl border border-border-default bg-page dark:bg-app p-4 sm:p-6 lg:p-8 shadow-sm">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-brand">
          Content Categories
        </h2>

        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-text-soft">
          Block an entire category of distracting websites with one click.
        </p>
      </div>

      <div className="columns-1 md:columns-2 xl:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
        {blocking_category.map((category) => {
          const Icon = category.icon;
          const enabled = blockedCategories.includes(category.id);
          const isOpen = expanded === category.id;

          return (
            <motion.div
              key={category.id}
              layout
              className="mb-4 sm:mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-border-default bg-surface shadow-sm transition-colors hover:bg-surface-soft"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between gap-3 p-3.5 sm:px-5 sm:py-4 cursor-pointer"
                onClick={() => setExpanded(isOpen ? null : category.id)}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-surface-soft">
                    <Icon className="size-5 sm:size-6 text-brand-muted dark:text-brand" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-text text-sm sm:text-base truncate">
                      {category.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-text-disabled whitespace-nowrap">
                      {category.domains.length} websites
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 sm:gap-3 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ToggleSwitch
                    checked={enabled}
                    onChange={() => toggleCategory(category.id)}
                  />

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-text-disabled"
                  >
                    <ChevronDown className="size-4 sm:size-5" />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border-default bg-surface-soft p-3.5 sm:px-5 sm:py-4">
                      <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium text-text-soft">
                        Included Websites
                      </p>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {category.domains.map((site) => (
                          <span
                            key={site}
                            className="rounded-full border border-border-default bg-surface px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-medium text-text-muted hover:bg-surface-hover"
                          >
                            {site}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 sm:h-7 sm:w-12 shrink-0 rounded-full transition-colors ${checked ? "bg-brand dark:bg-brand-muted" : "bg-border-strong"
        }`}
    >
      <motion.div
        className="absolute top-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-surface shadow-md"
        animate={{
          left: checked ? (typeof window !== "undefined" && window.innerWidth < 640 ? 22 : 24) : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  );
}

export default ContentCategory;