import mongoose from "mongoose";

const focusSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    plannedDuration: {
      type: Number,
      required: true,
      min: 1,
    },
    actualDuration: {
      type: Number,
      min: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    endReason: {
      type: String,
      enum: ["completed", "stopped", "crashed"],
      default: "stopped"
    },
  },
  {
    timestamps: true,
  },
);

const Focus = mongoose.model("Focus", focusSchema);

export default Focus;
