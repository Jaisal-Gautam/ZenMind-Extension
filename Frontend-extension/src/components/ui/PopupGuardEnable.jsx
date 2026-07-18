import { ToggleSwitch } from "@/components/ui/GuardToggle";
import { useDispatch, useSelector } from "react-redux";
import { Lock, Unlock } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { updateBlockingSettings } from "@/app/slices/blocking/blockingThunk";
function PopupGuardEnable() {
  const dispatch = useDispatch();
  const isLockdown = useSelector((state) => state.blocking.guardEnabled);
  const handleLockdownToggle = async () =>
    await dispatch(
      updateBlockingSettings({
        guardEnabled: !isLockdown,
      }),
    ).unwrap();

  const activeMode = useSelector((state) => state.blocking.activeMode);
  const modeOptions = [
  { value: "normal", label: "Normal" },
  { value: "deep", label: "Deep Focus" },
  { value: "strict", label: "Strict" },
];
  const handleModeChange = async(newMode) => await dispatch(
  updateBlockingSettings({
    activeMode: newMode,
  })
).unwrap();;
  

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
            <p className="text-xs text-slate-500">
              {isLockdown ? "Blocking is active" : "Enable blocking "}
            </p>
          </div>
        </div>
        <div>
          <ToggleSwitch checked={isLockdown} onChange={handleLockdownToggle} />
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
  const triggerRef = useRef(null);
  const [coords, setCoords] = useState(null);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === selected);

  useEffect(() => {
    function updateCoords() {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    }

    if (isOpen) {
      updateCoords();
      window.addEventListener("resize", updateCoords);
      window.addEventListener("scroll", updateCoords, true);
    }

    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
    };
  }, [isOpen]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {disabled && isHover && (
        <div className="z-9999 absolute left-1/2 top-full mt-2 -translate-x-1/2 -translate-y-3">
          <div className="bg-neutral-primary text-neutral-600 text-xs px-2 py-1 rounded-md shadow-sm">
            Enable blocking to choose a mode
          </div>
        </div>
      )}
      <button
        ref={triggerRef}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center justify-between w-full bg-white p-2.5 pl-10 pr-3 rounded-lg shadow-sm border text-sm font-medium text-slate-900 ${
          disabled ? "opacity-60" : ""
        }`}
      >
        <span>{selectedOption?.label ?? selected}</span>

        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && coords &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              style={{ position: "absolute", top: coords.top, left: coords.left, width: coords.width, zIndex: 99999 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-1.5"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => !disabled && handleSelect(option.value)}
                  className={`w-full text-left py-2 px-3 text-sm rounded-md transition-colors flex items-center justify-between ${
                    selected === option.value
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span>{option.label}</span>

                  {selected === option.value && (
                    <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}

      
    </div>
  );
};
export default PopupGuardEnable;
