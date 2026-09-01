import { body } from "express-validator";

export const taxValidator = [
  body("name").trim().notEmpty().withMessage("Tax name is required"),
  body("rate").trim().notEmpty().withMessage("Rate is required"),
];