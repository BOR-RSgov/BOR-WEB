import User from "../models/User.js";

/*
|--------------------------------------------------------------------------
| Get All Users
|--------------------------------------------------------------------------
*/

export const getUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Create User
|--------------------------------------------------------------------------
*/

export const createUser = async (req, res) => {

    try {

        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};