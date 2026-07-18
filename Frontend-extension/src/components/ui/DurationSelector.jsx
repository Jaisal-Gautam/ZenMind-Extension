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
    [customPresets]
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
      <h2 className="text-xl font-bold text-neutral-700 mb-6">Quick Presets</h2>

      <div className="flex gap-4 overflow-x-scroll pb-2">
        {" "}
        {presets.map((preset) => {
          const Icon = preset.icon || Clock;

          return (
            <div key={preset.id} className="flex-1 relative group">
              <button
                onClick={async() => {
                  dispatch(setDuration(preset.duration));
                  await dispatch(updatePreferences({defaultFocusDuration:preset.duration}))
                }}
                className="w-full flex  flex-col items-center justify-center py-6 px-4 border border-gray-200 rounded-xl hover:border-green-secondary hover:bg-neutral-primary/50 transition-all text-gray-700"
              >
                <Icon
                  size={24}
                  className="mb-3 text-green-secondary"
                  strokeWidth={1.5}
                />

                <span className="font-semibold text-[15px]">
                  {preset.duration} min
                </span>
              </button>

              {preset.id > 4 && (
                <button
                  onClick={(e) => removePreset(preset.id, e)}
                  className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-sm md:shadow-none focus:opacity-100"
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
          setError(null)
          setIsModalOpen(true)}}
        className="w-full flex items-center justify-center py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
      >
        <Plus size={18} className="mr-2" strokeWidth={2} /> Create Custom Preset
      </button>

      {/* Custom Duration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Add Custom Duration
            </h3>

            <form onSubmit={handleAddCustom}>
              <div className="mb-6">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-secondary focus:border-transparent transition-all"
                  placeholder="e.g. 45"
                />
              </div>

              {error ? (
                <p className="text-sm text-red-600 mb-4">{error}</p>
              ) : null}

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg font-medium bg-green-secondary text-white shadow-sm hover:bg-green-primary transition-colors disabled:cursor-not-allowed disabled:opacity-60"
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
