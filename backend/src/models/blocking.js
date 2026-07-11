import mongoose from "mongoose";
import { tempUnlockSchema, blockSiteSchema } from "./domain.js";

const blockingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    guardEnabled: {
      type: Boolean,
      default: false,
    },

    activeMode: {
      type: String,
      enum: ["normal", "deep", "strict"],
      default: "normal",
    },

    normal: {
      type: [blockSiteSchema],
      default: [],
    },

    focus: {
      type: [blockSiteSchema],
      default: [],
    },

    strict: {
      type: [blockSiteSchema],
      default: [],
    },

    tempUnlock: {
      type: [tempUnlockSchema],
      default: [],
    },

    blockedCategories: {
      type: [
        {
          type: String,
          enum: [
            "social",
            "entertainment",
            "gaming",
            "shopping",
            "messaging",
          ],
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Blocking = mongoose.model("Blocking", blockingSchema);

export default Blocking;