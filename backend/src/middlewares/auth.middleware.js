import User from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ApiError(401, "Unauthorized Access");
  }
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer") {
    throw new ApiError(401, "Unauthorized Access");
  }
  const { id } = verifyAccessToken(token);
  const user = await User.findById(id).select("-password");
  if (!user) throw new ApiError(401, "Unauthorized Access");
  req.user = user;
  next();
});
