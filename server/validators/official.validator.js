import { body } from "express-validator";

export const officialValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("designation")
    .isIn(["SMBR", "Chairman", "Minister", "DLR", "Officer"])
    .withMessage("Invalid designation"),
];