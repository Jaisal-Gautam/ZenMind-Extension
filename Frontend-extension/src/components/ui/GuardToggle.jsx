import React from "react";
import { easeIn, easeInOut, motion } from "framer-motion";
import { Unlock, Lock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import DeepFocus from "@/assets/DeepFocusBg.png";
import GentleGuard from "@/assets/GentleGuardBg.png";
import StrictMode from "@/assets/StrictBg.jpg";
import { updateBlockingSettings } from "@/app/slices/blocking/blockingThunk";
export default function GuardToggle() {
  const bgImages = {
  normal: GentleGuard,
  deep: DeepFocus,
  strict: StrictMode,
};
  const dispatch = useDispatch();
  const isLockdown = useSelector((state) => state.blocking.guardEnabled);
  const activeMode = useSelector((state) => state.blocking.activeMode);

  const modeOptions = [
  { value: "normal", label: "Normal" },
  { value: "deep", label: "Deep Focus" },
  { value: "strict", label: "Strict" },
];

  const handleModeChange = async (newMode) => {
    await dispatch(
      updateBlockingSettings({
        activeMode: newMode,
      }),
    ).unwrap();
  };

  const handleLockdownToggle = async () => {
    await dispatch(
      updateBlockingSettings({
        guardEnabled: !isLockdown,
      }),
    ).unwrap();
  };

  return (
    <section className="relative w-full  h-80 mx-auto rounded-3xl overflow-hidden shadow-xl flex items-center justify-center md:justify-start border border-gray-200">
      <motion.img
        key={activeMode}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease:easeIn }}
        src={bgImages[activeMode] || GentleGuard}
        alt={`${activeMode} background`}
        className="absolute inset-0 w-full md:mask-l-from-20% h-full object-cover ]  select-none"
      />

      <div className="absolute inset-y-0 left-0 w-2/3 md:bg-linear-to-r md:from-white md:via-white md:to-white/5 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6 items-center md:items-start px-4 md:px-0 md:pl-12 max-w-md w-full">
        <SegmentedControl
          options={modeOptions}
          selected={activeMode}
          onChange={handleModeChange}
        />

        <div className="flex w-full items-center justify-between p-4 bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl max-w-85 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/80 rounded-xl shadow-sm">
              {isLockdown ? (
                <Lock
                  className="w-5 h-5 text-green-primary"
                  strokeWidth={2.5}
                />
              ) : (
                <Unlock className="w-5 h-5 text-slate-700" strokeWidth={2.5} />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold tracking-wide text-slate-900 uppercase">
                Website Blocking
              </span>
            </div>
          </div>

          <ToggleSwitch checked={isLockdown} onChange={handleLockdownToggle} />
        </div>
      </div>
    </section>
  );
}

const SegmentedControl = ({ options, selected, onChange }) => {
  return (
    <div className="flex bg-white/60 backdrop-blur-sm p-1.5 rounded-xl w-full max-w-xs shadow-sm border border-white/50">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative flex-1 py-2 text-xs font-semibold transition-colors z-10 ${
            selected === option.value
              ? "text-slate-900"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {selected === option.value && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-neutral-primary/50 rounded-lg shadow-sm"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          <span className="relative z-20">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export const ToggleSwitch = ({ checked, onChange, type = "Site" }) => {
  return (
    <button
      onClick={onChange}
      className={`flex ${type === "Site" ? "w-12 h-7" : "w-20 h-10"}  rounded-full p-1 transition-colors cursor-pointer ${
        checked ? "bg-green-primary" : "bg-gray-300"
      }`}
      aria-pressed={checked}
    >
      <motion.div
        layout
        className={`bg-white ${type === "Site" ? "w-5 h-5" : "w-8 h-8"}  rounded-full shadow-sm`}
        animate={{ x: checked ? (type === "Site" ? 20 : 40) : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
};
