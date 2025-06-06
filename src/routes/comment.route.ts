import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../controllers/comment.controller";
import { protectRoute } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validation.middleware";
import { createCommentValidator } from "../validator/comment.validator";

const router = express.Router();
router.use(protectRoute);

router.post("/:id", createCommentValidator, validateRequest, createComment);
router.get("/:id", getAllComments);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
