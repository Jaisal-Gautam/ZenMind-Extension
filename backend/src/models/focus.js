import mongoose from "mongoose";

const focusSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      default: null,
    },

    plannedDuration: {
      type: Number, 
      required: true,
      min: 1,
    },


    actualDuration: {
      type: Number,
      default: 0,
      min: 0,
    },


    lastResumedAt: {
      type: Date,
      default: null,
    },

    isPaused: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "active",
        "completed",
        "cancelled",
        "restarted",
        "expired",
      ],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);


focusSchema.index({ user: 1, status: 1 });


focusSchema.index({ user: 1, startTime: -1 });

const Focus = mongoose.model("Focus", focusSchema);

export default Focus;