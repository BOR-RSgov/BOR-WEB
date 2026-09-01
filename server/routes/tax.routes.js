import express from "express";
import Tax from "../models/Tax.js";
import { createBaseController } from "../controllers/base.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { taxValidator } from "../validators/tax.validator.js";

const router = express.Router();
const ctrl = createBaseController(Tax, "Tax");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);

router.post("/", protect, authorize("super-admin", "editor"), taxValidator, validate, ctrl.create);
router.put("/:id", protect, authorize("super-admin", "editor"), taxValidator, validate, ctrl.update);
router.delete("/:id", protect, authorize("super-admin"), ctrl.remove);

export default router;