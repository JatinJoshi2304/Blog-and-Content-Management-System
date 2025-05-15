import express from "express";
import {
  updateUser,
  getUserByUsername,
  deleteUser,
  uploadImage,
} from "../controllers/user.controller";
import { protectRoute } from "../middlewares/auth.middleware";
import { updateUserValidation } from "../validator/user.validation";
import upload from "../middlewares/upload.middleware";
import { validateRequest } from "../middlewares/validation.middleware";
import { getUserById } from "../controllers/user.controller";

const router = express.Router();

// Apply JWT protection to all routes below
router.use(protectRoute);

// Routes
router.put("/", updateUserValidation, validateRequest, updateUser);
router.get("/:username", getUserByUsername);
router.put("/uploadProfile", upload.single("avatar"), uploadImage);
router.delete("/:username", deleteUser);

export default router;
