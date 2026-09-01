import {body} from "express-validator";

export const createUserValidator=[
body("fullName").trim().notEmpty().withMessage("Full name is required"),
body("email").isEmail().withMessage("Valid email required"),
body("password").isLength({min:6}).withMessage("Password must be at least 6 characters"),
body("role").optional().isIn(["super-admin","admin","editor"]).withMessage("Invalid role")
];

export const updateUserValidator=[
body("fullName").optional().trim(),
body("email").optional().isEmail().withMessage("Valid email required"),
body("phone").optional(),
body("designation").optional(),
body("department").optional()
];