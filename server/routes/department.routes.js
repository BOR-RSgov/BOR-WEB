import express from "express";
import Department from "../models/Department.js";
import { createBaseController } from "../controllers/base.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { departmentValidator } from "../validators/department.validator.js";

const router = express.Router();
const ctrl = createBaseController(Department, "Department");

router.get("/", ctrl.getAll);              // public — website needs to list departments
router.get("/:id", ctrl.getOne);           // public

router.post("/", protect, authorize("super-admin", "editor"), departmentValidator, validate, ctrl.create);
router.put("/:id", protect, authorize("super-admin", "editor"), departmentValidator, validate, ctrl.update);
router.delete("/:id", protect, authorize("super-admin"), ctrl.remove);

export default router;