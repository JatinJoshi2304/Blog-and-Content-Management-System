import express from "express";
import {
  updateUser,
  getUserByUsername,
  deleteUser,
  updateProfilePic,
} from "../controllers/user.controller";
import { protectRoute } from "../middlewares/auth.middleware";
import { updateUserValidation } from "../validator/user.validation";
import { upload } from "../middlewares/upload.middleware";
import { validateRequest } from "../middlewares/validation.middleware";

const router = express.Router();

router.use(protectRoute);

router.put("/", updateUserValidation, validateRequest, updateUser);
router.get("/:username", getUserByUsername);
router.put("/profile", upload.single("avatar"), updateProfilePic);
router.delete("/:username", deleteUser);

export default router;
