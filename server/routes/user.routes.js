import express from "express";
import { getUsers, createUser } from "../controllers/user.controller.js";
import { protect,authorize } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", protect, authorize("super-admin"), getUsers);
router.post("/", protect, authorize("super-admin"), createUser);

export default router;
