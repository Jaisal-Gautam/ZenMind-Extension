import mongoose from "mongoose";
const websiteSessionSchema = new mongoose.Schema(
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
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);
websiteSessionSchema.index({
  user: 1,
  startTime: -1,
});
websiteSessionSchema.index({
  user: 1,
  domain: 1,
});

const WebsiteSession = mongoose.model("WebsiteSession", websiteSessionSchema);

export default WebsiteSession;
