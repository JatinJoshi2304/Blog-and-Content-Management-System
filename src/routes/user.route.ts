import express from "express";
import {
  updateUser,
  getUserByUsername,
  deleteUser,
} from "../controllers/user.controller";
import { protectRoute } from "../middlewares/auth.middleware";
import { updateUserValidation } from "../validator/user.validation";
import { upload } from "../middlewares/upload.middleware";

const router = express.Router();

// Apply JWT protection to all routes below
router.use(protectRoute);

// Routes
router.put("/", updateUserValidation, updateUser);
router.get("/:username", getUserByUsername);
router.put("/profile", protectRoute, upload.single("avatar"), updateUser);
router.delete("/:username", deleteUser);

export default router;
