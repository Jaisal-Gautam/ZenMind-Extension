import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { blocking_category } from "@/utils/blockingCategories";
import { toggleCategory } from "@/app/slices/blockingSlice";

function ContentCategory() {
  const dispatch = useDispatch();

  const blockedCategories = useSelector(
    (state) => state.blocking.blockedCategories,
  );

  const [expanded, setExpanded] = useState(null);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-tertiary p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-green-primary">
          Content Categories
        </h2>

        <p className="mt-2 text-neutral-500">
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
              className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer"
                onClick={() => setExpanded(isOpen ? null : category.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                    <Icon size={22} className="text-green-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-neutral-800">
                      {category.name}
                    </h3>

                    <p className="text-sm text-neutral-500">
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
                    onChange={() => dispatch(toggleCategory(category.id))}
                  />

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-neutral-400"
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
                    <div className="border-t border-neutral-200 bg-neutral-50 px-5 py-4">
                      <p className="mb-3 text-sm font-medium text-neutral-500">
                        Included Websites
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {category.domains.map((site) => (
                          <span
                            key={site}
                            className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700"
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
        checked ? "bg-green-primary" : "bg-neutral-300"
      }`}
    >
      <motion.div
        className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-md"
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
