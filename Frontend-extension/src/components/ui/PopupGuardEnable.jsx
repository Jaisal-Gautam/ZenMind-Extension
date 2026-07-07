import { ToggleSwitch } from "@/components/ui/GuardToggle";
import { useDispatch, useSelector } from "react-redux";
import { setMode,toggleGuard } from "@/app/slices/blockingSlice";
import { Lock,Unlock } from "lucide-react";
import { useState } from "react";
import { AnimatePresence,motion } from "motion/react";
function PopupGuardEnable() {
  const dispatch = useDispatch();
  const handleLockdownToggle = () => dispatch(toggleGuard());

  const activeMode = useSelector((state) => state.blocking.activeMode);
  const modeOptions = ["Normal", "Deep Focus", "Strict"];
  const handleModeChange = (newMode) => dispatch(setMode(newMode));
  const isLockdown = useSelector((state) => state.blocking.guardEnabled);

  return (
    <div className="w-full bg-white/60 backdrop-blur-sm border border-gray-100 p-4 mt-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {isLockdown ? (
            <Lock className="w-7 h-7 text-green-secondary" strokeWidth={2.5} />
          ) : (
            <Unlock className="w-7 h-7 text-slate-700" strokeWidth={2.5} />
          )}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Guard</h3>
            <p className="text-xs text-slate-500">{isLockdown ? "Blocking is active" : "Enable blocking "}</p>
          </div>
        </div>
        <div>
          <ToggleSwitch  checked={isLockdown} onChange={handleLockdownToggle} />
        </div>
      </div>

      <div className="mt-4">
        <DropdownMenu
          options={modeOptions}
          selected={activeMode}
          onChange={handleModeChange}
          disabled={!isLockdown}
        />
      </div>
    </div>
  );
}

const DropdownMenu = ({ options, selected, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Menu Trigger Button */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-disabled={disabled}
        className={`flex items-center justify-between w-full bg-white p-2.5 pl-10 pr-3 rounded-lg shadow-sm border text-sm font-medium text-slate-900 focus:outline-none ${
          disabled ? "opacity-60" : ""
        }`}
        disabled={disabled}
      >
        <span>{selected}</span>
        {/* Chevron Icon */}
        <svg
          className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-sm shadow-black/5 border border-gray-100 overflow-hidden z-50 p-1.5 dynamic-layer"
          >
            {options.map((option) => (
              <button
                key={option}
                role="option"
                aria-selected={selected === option}
                onClick={() => !disabled && handleSelect(option)}
                disabled={disabled}
                className={`w-full text-left py-2 px-3 text-sm rounded-md transition-colors flex items-center justify-between ${
                  selected === option
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                } ${disabled ? "pointer-events-none opacity-60" : ""}`}
              >
                <span>{option}</span>
                {selected === option && (
                  <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {disabled && isHover && (
        <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 z-50">
          <div className="bg-neutral-primary text-neutral-600 text-xs px-2 py-1 rounded-md shadow-sm">
            Enable blocking to choose a mode
          </div>
        </div>
      )}
    </div>
  );
};
export default PopupGuardEnable;
