import mongoose from "mongoose";
export const blockSiteSchema = new mongoose.Schema({
  _id: false,
  domain: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export const tempUnlockSchema = new mongoose.Schema({
  _id: false,
  domain: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});


