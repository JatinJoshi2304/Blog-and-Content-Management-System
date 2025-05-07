import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
  updateThumbnail,
} from "../controllers/post.controller";
import { protectRoute } from "../middlewares/auth.middleware";
import { createPostValidator } from "../validator/post.validator";
import { validateRequest } from "../middlewares/validation.middleware";
import upload from "../middlewares/upload.middleware";

const router = express.Router();
router.use(protectRoute);

router.post("/", createPostValidator, validateRequest, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/updateThumbnail/:id", upload.single("thumbnail"), updateThumbnail);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
