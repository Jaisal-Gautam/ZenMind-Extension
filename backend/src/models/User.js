import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    resetPasswordOTP: {
      type: String,
      select: false,
    },
    resetPasswordOTPExpiry: {
      type: Date,
      select: false,
    },
    refreshToken: {
      type: String,
      index: true,
      select: false,
    },
    timezone: {
      type: String,
      default: "UTC",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
