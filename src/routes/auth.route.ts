import express from "express";
import { signup, login } from "../controllers/auth.controller";
import {
  createUserValidation,
  loginUserValidation,
} from "../validator/user.validation";
import { validateRequest } from "../middlewares/validation.middleware";

const router = express.Router();

router.post("/signup", createUserValidation, validateRequest, signup);
router.post("/login", loginUserValidation, validateRequest, login);

export default router;
