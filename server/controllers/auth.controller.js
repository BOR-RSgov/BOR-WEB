import User from "../models/User.js";
import ApiResponse  from "../utils/apiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

export const register = asyncHandler (async (req, res) => {
  
    const { fullName, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email});

    if (existingUser) {
        throw new ApiError( 400, "Email already exists");
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
    });

    res.status(201).json({
        success: true,
        message: "Registration successful",
        data: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            token: user.generateToken()
        }
    });
});
/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

export const login = asyncHandler(async (req, res) => {
  
    const { email, password } = req.body;

    // Include password because select:false
    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      throw new ApiError( 400, "Invalid Email or Password");
    }

    // Compare Password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
     throw new ApiError( 400, "Invalid Email or Password");
    }

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            token: user.generateToken()
        }
    });
});
/*
|--------------------------------------------------------------------------
| Get Logged In User
|--------------------------------------------------------------------------
*/

export const getProfile = async (req, res) => {
   res.status(200).json(new ApiResponse(200,"Profile fetched successfully",req.user));
  };