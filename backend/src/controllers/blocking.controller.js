import {
  addSite,
  removeSite,
  getBlocking,
  updateBlocking,
  addBlockedCategory,
  addTemporaryUnlock,
  removeBlockedCategory,
  removeTemporaryUnlock,
} from "../services/blocking.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getBlockingController = asyncHandler(async (req, res) => {
  const blocking = await getBlocking(req.user._id);

  res.status(200).json({
    success: true,
    message: "Blocking fetched successfully.",
    blocking,
  });
});
export const updateBlockingController = asyncHandler(async (req, res) => {
  const blocking = await updateBlocking(req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: "Blocking updated successfully.",
    blocking,
  });
});

export const addSiteController = asyncHandler(async (req, res) => {
  const { mode, domain } = req.body;
  const blocking = await addSite(req.user._id, mode, domain);

  res.status(200).json({
    success: true,
    message: "Site Added successfully.",
    blocking,
  });
});
export const removeSiteController = asyncHandler(async (req, res) => {
  const { mode, domain } = req.body;
  const blocking = await removeSite(req.user._id, mode, domain);

  res.status(200).json({
    success: true,
    message: "Site Removed successfully.",
    blocking,
  });
});
export const addBlockedCategoryController = asyncHandler(async (req, res) => {
  const { category } = req.body;
  const blocking = await addBlockedCategory(req.user._id, category);

  res.status(200).json({
    success: true,
    message: "Blocked Category Added successfully.",
    blocking,
  });
});
export const removeBlockedCategoryController = asyncHandler(
  async (req, res) => {
    const { category } = req.body;
    const blocking = await removeBlockedCategory(req.user._id, category);

    res.status(200).json({
      success: true,
      message: "Blocked Category Removed successfully.",
      blocking,
    });
  },
);
export const addTemporaryUnlockController = asyncHandler(async (req, res) => {
  const { domain, expiresAt } = req.body;
  const blocking = await addTemporaryUnlock(req.user._id, domain, expiresAt);

  res.status(200).json({
    success: true,
    message: "Temporary unlock added successfully.",
    blocking,
  });
});
export const removeTemporaryUnlockController = asyncHandler(
  async (req, res) => {
    const { domain } = req.body;
    const blocking = await removeTemporaryUnlock(req.user._id, domain);

    res.status(200).json({
      success: true,
      message: "Temporary unlock removed successfully.",
      blocking,
    });
  },
);
