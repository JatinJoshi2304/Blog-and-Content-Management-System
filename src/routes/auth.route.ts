import express from "express";
import { signup, login } from "../controllers/auth.controller";
import {
  createUserValidation,
  loginUserValidation,
} from "../validator/user.validation";

const router = express.Router();

router.post("/signup", createUserValidation, signup);
router.post("/login", loginUserValidation, login);

export default router;
