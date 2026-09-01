import express from "express";
import Resource from "../models/Resource.js";
import { createBaseController } from "../controllers/base.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { resourceValidator } from "../validators/resource.validator.js";
import upload from "../middleware/upload.middleware.js";
import { attachUploadedFile } from "../middleware/cloudinaryUpload.middleware.js";

const router = express.Router();
const ctrl = createBaseController(Resource, "Resource", "department");

// Public — website calls GET /api/v1/resources?category=causelist etc.
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);

router.post("/", protect, authorize("super-admin", "editor"), upload.single("file"), attachUploadedFile("file", "resources", "raw"), resourceValidator, validate, ctrl.create);
router.put("/:id", protect, authorize("super-admin", "editor"), upload.single("file"), attachUploadedFile("file", "resources", "raw"), resourceValidator, validate, ctrl.update);
router.delete("/:id", protect, authorize("super-admin"), ctrl.remove);

export default router;