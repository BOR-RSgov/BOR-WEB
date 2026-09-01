import { body } from "express-validator";

export const causeListValidator = [
  body("member").isIn(["Member-II", "Member-III", "Member-V"]).withMessage("Invalid member"),
  body("division")
    .isIn(["Peshawar", "Mardan", "Hazara", "Bannu", "Malakand", "Kohat", "D.I. Khan"])
    .withMessage("Invalid division"),
  body("hearingDate").isISO8601().withMessage("Valid hearing date is required"),
];