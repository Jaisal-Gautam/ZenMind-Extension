import Blocking from "../models/blocking.js";
import { ApiError } from "../utils/apiError.js";


export const createDefaultBlocking = async (userId) => {
  const blocking = await Blocking.create({ user: userId });
  return blocking;
};

export const getBlocking = async (userId) => {
  const blocking = await Blocking.findOne({ user: userId });
  if (!blocking) throw new ApiError(404, "Blocking not found.");
  return blocking;
};

export const updateBlocking = async (userId, updates) => {
  const allowedFields = ["guardEnabled", "activeMode", "blockedCategories"];
  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(([key]) => allowedFields.includes(key)),
  );
  const blocking = await Blocking.findOneAndUpdate(
    { user: userId },
    filteredUpdates,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!blocking) {
    throw new ApiError(404, "Blocking not found.");
  }

  return blocking;
};

export const addSite = async (userId, mode, domain) => {
  const blocking = await Blocking.findOne({ user: userId });
  if (!blocking) {
    throw new ApiError(404, "Blocking not found.");
  }
  const alreadyExists = blocking[mode].some((site) => site.domain === domain);
  
  if (alreadyExists) {
    throw new ApiError(409, "Site already added");
  }
  blocking[mode].push({
    domain,
    createdAt: new Date(),
  });
  await blocking.save();
  return blocking;
};

export const removeSite = async (userId, mode, domain) => {
  const blocking = await Blocking.findOne({ user: userId });
  if (!blocking) {
    throw new ApiError(404, "Blocking not found.");
  }
  const alreadyExists = blocking[mode].some((site) => site.domain === domain);
  if (!alreadyExists) {
    throw new ApiError(404, "Site Not Found.");
  }
  blocking[mode] = blocking[mode].filter((site) => site.domain !== domain);
  await blocking.save();
  return blocking;
};

export const addBlockedCategory = async (userId, category) => {
  const blocking = await Blocking.findOne({ user: userId });
  if (!blocking) {
    throw new ApiError(404, "Blocking not found.");
  }
  const alreadyExists = blocking.blockedCategories.some((site) => site === category);
  if (alreadyExists) {
    throw new ApiError(409, "Category already Added.");
  }
  blocking.blockedCategories.push(category);
  await blocking.save();
  return blocking;
};

export const removeBlockedCategory = async (userId, category) => {
  const blocking = await Blocking.findOne({ user: userId });
  if (!blocking) {
    throw new ApiError(404, "Blocking not found.");
  }
  const alreadyExists = blocking.blockedCategories.some((site) => site === category);
  if (!alreadyExists) {
    throw new ApiError(404, "Category not found.");
  }
  blocking.blockedCategories = blocking.blockedCategories.filter((site) => site !== category);
  await blocking.save();
  return blocking;
};

export const addTemporaryUnlock = async (userId, domain, expiresAt) => {
  const blocking = await Blocking.findOne({ user: userId });
  if (!blocking) {
    throw new ApiError(404, "Blocking not found.");
  }
  const alreadyExists = blocking.tempUnlock.some((site) => site.domain === domain);
  if (alreadyExists) {
    throw new ApiError(409, "already temporarily unlocked");
  }

  blocking.tempUnlock.push({
    domain,
    expiresAt,
  });
  await blocking.save();
  return blocking;
};

export const removeTemporaryUnlock = async (userId, domain) => {
  const blocking = await Blocking.findOne({ user: userId });
  if (!blocking) {
    throw new ApiError(404, "Blocking not found.");
  }
  const alreadyExists = blocking.tempUnlock.some((site) => site.domain === domain);
  if (!alreadyExists) {
    throw new ApiError(404, "Site Not Found.");
  }
  blocking.tempUnlock = blocking.tempUnlock.filter((site) => site.domain !== domain);
  await blocking.save();
  return blocking;
};
