import User from "../models/User.js";
import ApiResponse  from "../utils/apiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import * as userService from "../services/user.service.js";
/*
|--------------------------------------------------------------------------
| Get All Users
|--------------------------------------------------------------------------
*/

export const getUsers = asyncHandler (async (req, res) => {
        const data=await userService.getUsersService(req.query);
        res.status(200).json(new ApiResponse(200,"Users fetched successfully", data));
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