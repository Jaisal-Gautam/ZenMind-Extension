import mongoose from "mongoose";
const blockedAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["normal", "deep", "strict"],
      required:true,
    },
    blockedAt:{
        type:Date,
        required:true,
    }
  },
  { timestamps: true },
);
blockedAttemptSchema.index({
  user: 1,
    domain: 1,
});
const BlockedAttempt = mongoose.model("BlockedAttempt", blockedAttemptSchema);

export default BlockedAttempt;
