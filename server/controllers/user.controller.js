import User from "../models/User.js";
import ApiResponse  from "../utils/apiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
/*
|--------------------------------------------------------------------------
| Get All Users
|--------------------------------------------------------------------------
*/

export const getUsers = asyncHandler (async (req, res) => {
        const users = await User.find().select("-password");
        if (!users) {
        throw new ApiError( 500, "Something went wrong");
    }
        res.status(200).json(new ApiResponse(200,"Users fetched successfully",user));
});

/*
|--------------------------------------------------------------------------
| Create User
|--------------------------------------------------------------------------
*/

export const createUser = asyncHandler (async (req, res) => {

        const user = await User.create(req.body);
          res.status(200).json(new ApiResponse(201,"Users created successfully",user));
});