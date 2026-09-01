import { body } from "express-validator";

export const sliderValidator = [
  body("image.url").notEmpty().withMessage("Slider image is required"),
  body("order").optional().isNumeric().withMessage("Order must be a number"),
];