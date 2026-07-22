import {body} from "express-validator";

export const registerValidator=[
body("fullName").trim().notEmpty().withMessage("Full name is required"),
body("email").trim().isEmail().withMessage("Valid email required"),
body("password").isLength({min:6}).withMessage("Password must be at least 6 characters")
];

export const loginValidator=[
body("email").isEmail().withMessage("Valid email required"),
body("password").notEmpty().withMessage("Password is required")
];