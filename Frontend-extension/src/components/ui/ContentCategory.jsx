import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { blocking_category } from "@/utils/blockingCategories";
import { addBlockedCategory,removeBlockedCategory } from "@/app/slices/blocking/blockingThunk";

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
    <div className="rounded-2xl border border-border-default bg-page dark:bg-app p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-brand">
          Content Categories
        </h2>

        <p className="mt-2 text-text-soft">
          Block an entire category of distracting websites with one click.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 xl:columns-3 gap-5 space-y-5">
        {" "}
        {blocking_category.map((category) => {
          const Icon = category.icon;

          const enabled = blockedCategories.includes(category.id);

          const isOpen = expanded === category.id;

          return (
            <motion.div
              layout
              className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-border-default bg-surface shadow-sm transition-colors hover:bg-surface-soft"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer"
                onClick={() => setExpanded(isOpen ? null : category.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-soft">
                    <Icon size={22} className="text-brand-muted dark:text-brand" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-text">
                      {category.name}
                    </h3>

                    <p className="text-sm text-text-disabled">
                      {category.domains.length} websites
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3"
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
                    <ChevronDown size={18} />
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
                    <div className="border-t border-border-default bg-surface-soft px-5 py-4">
                      <p className="mb-3 text-sm font-medium text-text-soft">
                        Included Websites
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {category.domains.map((site) => (
                          <span
                            key={site}
                            className="rounded-full border border-border-default bg-surface px-3 py-1 text-xs font-medium text-text-muted hover:bg-surface-hover"
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
      className={`relative h-7 w-12 rounded-full transition-colors ${
        checked ? "bg-brand dark:bg-brand-muted" : "bg-border-strong"
      }`}
    >
      <motion.div
        className="absolute top-1 h-5 w-5 rounded-full bg-surface shadow-md"
        animate={{
          left: checked ? 24 : 4,
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
