import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiResponse  from "../utils/apiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
/*
|--------------------------------------------------------------------------
| Protect Routes
|--------------------------------------------------------------------------
*/
export const protect = async (req, res, next) => {
  try {
    let token;
    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No Token
    if (!token) {
      throw new ApiError( 401, "Not authorized. Token missing");
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get Logged-in User
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new ApiError(401, "User no longer exists.");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
/*
|--------------------------------------------------------------------------
| Authorize Roles
|--------------------------------------------------------------------------
*/

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    next();
  };
};
