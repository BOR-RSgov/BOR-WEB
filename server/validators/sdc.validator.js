import { body } from "express-validator";

export const sdcValidator = [
  body("name").trim().notEmpty().withMessage("SDC name is required"),
  body("address").trim().notEmpty().withMessage("Address is required"),
];