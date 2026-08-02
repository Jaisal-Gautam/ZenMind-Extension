
export const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";

  // Handle MongoDB E11000 duplicate key error
  if (error.code === 11000) {
    statusCode = 409;
    const field = Object.keys(error.keyValue || {})[0];
    if (field === "username") {
      message = "Username already exists.";
    } else if (field === "email") {
      message = "Email already exists.";
    } else {
      message = `${field || "Field"} already exists.`;
    }
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};