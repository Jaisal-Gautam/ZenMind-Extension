import mongoose from "mongoose";
const customPresetSchema = new mongoose.Schema({
  _id: false,
  id: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});
const userPreferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    defaultFocusDuration: {
      type: Number,
      default: 30,
      min: 1,
    },
    dailyFocusGoal: {
      type: Number,
      default: 180,
      min: 1,
    },
    defaultMusic: {
      type: String,
      default: "rain",
    },
    defaultMusicVolume: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },
    musicLoop: {
      type: Boolean,
      default: false,
    },
    customPresets: {
      type: [customPresetSchema],
      default: [],
    },
  },
  { timestamps: true },
);
userPreferenceSchema.index({
    user:1
});
const UserPreference = mongoose.model("UserPreference", userPreferenceSchema);

export default UserPreference;
