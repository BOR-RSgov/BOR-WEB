import express from "express";
import Page from "../models/Page.js";
import { createBaseController } from "../controllers/base.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { pageValidator } from "../validators/page.validator.js";

const router = express.Router();
const ctrl = createBaseController(Page, "Page");

// Public — website calls GET /api/v1/pages?status=published
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);

router.post("/", protect, authorize("super-admin", "editor"), pageValidator, validate, ctrl.create);
router.put("/:id", protect, authorize("super-admin", "editor"), pageValidator, validate, ctrl.update);
router.delete("/:id", protect, authorize("super-admin"), ctrl.remove);

export default router;