import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/post.controller";
import { protectRoute } from "../middlewares/auth.middleware";
import { createPostValidation } from "../validator/post.validation";

const router = express.Router();
router.use(protectRoute);

router.post("/", createPostValidation, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
