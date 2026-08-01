import { useState, useMemo } from "react";
import { setDuration } from "@/app/slices/focus/focusSlice";
import { useDispatch, useSelector } from "react-redux";
import { Timer, Clock, Hourglass, History, Plus, X } from "lucide-react";
import { updatePreferences } from "@/app/slices/setting/settingsThunk";

const initialPresets = [
  { id: 1, duration: 25, icon: Timer },
  { id: 2, duration: 50, icon: Clock },
  { id: 3, duration: 90, icon: Hourglass },
  { id: 4, duration: 120, icon: History },
];

function DurationSelector() {
  const dispatch = useDispatch();
  const customPresets = useSelector(
    (state) => state.settings.customPresets || [],
  );
  const presets = useMemo(
    () => [...initialPresets, ...customPresets],
    [customPresets],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customDuration, setCustomDuration] = useState("");
  const { loading } = useSelector((state) => state.settings);
  const [error, setError] = useState(null);

  const removePreset = async (idToRemove, e) => {
    e.stopPropagation();
    if (loading) return;

    const updatedPresets = customPresets.filter(
      (preset) => preset.id !== idToRemove,
    );

    try {
      setError(null);
      await dispatch(
        updatePreferences({
          customPresets: updatedPresets,
        }),
      ).unwrap();
    } catch (err) {
      console.error("Failed to remove preset:", err);
      setError(err?.message || "Failed to remove preset");
    }
  };

  const handleAddCustom = async (e) => {
    e.preventDefault();
    if (loading) return;

    const duration = parseInt(customDuration, 10);
    if (duration <= 0) {
      setError("Please enter a valid duration.");
      return;
    }

    const exists = presets.some((preset) => preset.duration === duration);
    if (exists) {
      setError("A preset with that duration already exists.");
      return;
    }

    const newPreset = {
      id: crypto.randomUUID(),
      duration,
    };

    try {
      setCustomDuration("");
      setError(null);
      await dispatch(
        updatePreferences({
          customPresets: [...customPresets, newPreset],
        }),
      ).unwrap();
      setCustomDuration("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to add preset:", err);
      setError(err?.message || "Failed to add preset");
    }
  };

  return (
    <>
      <h2 className="text-lg sm:text-xl font-bold text-text-muted mb-4 sm:mb-6">
        Quick Presets
      </h2>

      {/* Grid on mobile, smooth scroll row on larger viewports */}
      <div className="grid grid-cols-2 md:flex md:flex-nowrap gap-3 sm:gap-4 overflow-x-auto pb-2">        {presets.map((preset) => {
        const Icon = preset.icon || Clock;

        return (
          <div key={preset.id} className="relative group w-full">
            <button
              onClick={async () => {
                dispatch(setDuration(preset.duration));
                await dispatch(
                  updatePreferences({
                    defaultFocusDuration: preset.duration,
                  }),
                );
              }}
              className="w-full flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 rounded-xl border border-border-default bg-page dark:bg-app hover:bg-app-soft hover:border-border-brand transition-all duration-200 text-text-muted"
            >
              <Icon
                className="mb-2 sm:mb-3 size-5 sm:size-6 text-brand-muted"
                strokeWidth={1.5}
              />

              <span className="font-semibold text-xs sm:text-[15px]">
                {preset.duration} min
              </span>
            </button>

            {customPresets.some(
              (customPreset) => customPreset.id === preset.id,
            ) && (
                <button
                  onClick={(e) => removePreset(preset.id, e)}
                  className="absolute top-2 right-2 text-text-disabled hover:text-danger transition-colors p-1 bg-page dark:bg-app rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 shadow-sm md:shadow-none focus:opacity-100"
                  aria-label="Remove preset"
                  disabled={loading}
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              )}
          </div>
        );
      })}
      </div>

      {/* Add Custom Button */}
      <button
        onClick={() => {
          setError(null);
          setIsModalOpen(true);
        }}
        className="mt-4 sm:mt-8 w-full flex items-center justify-center py-2.5 sm:py-3 rounded-xl border-2 border-dashed border-border-default bg-page dark:bg-app text-sm sm:text-base text-text-soft font-medium hover:bg-app-soft hover:border-border-brand transition-colors duration-200"
      >
        <Plus size={18} className="mr-2" strokeWidth={2} /> Create Custom Preset
      </button>

      {/* Custom Duration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay backdrop-blur-sm px-4">
          <div className="bg-app rounded-2xl shadow-xl w-full max-w-sm p-5 sm:p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg sm:text-xl font-bold text-text mb-4">
              Add Custom Duration
            </h3>

            <form onSubmit={handleAddCustom}>
              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor="duration"
                  className="block text-xs sm:text-sm font-medium text-text-muted mb-2"
                >
                  Duration (minutes)
                </label>
                <input
                  id="duration"
                  type="number"
                  min="1"
                  autoFocus
                  required
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  className="w-full border border-border-default rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base bg-app text-text placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  placeholder="e.g. 45"
                />
              </div>

              {error ? (
                <p className="text-xs sm:text-sm text-danger mb-4">{error}</p>
              ) : null}

              <div className="flex gap-2 sm:gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm border border-border-light rounded-lg font-medium text-text-soft hover:bg-app-hover transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg font-medium bg-brand-muted dark:bg-brand-muted/80 text-text shadow-sm hover:bg-brand transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Add Preset"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default DurationSelector;