import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByName,
  updateCategory,
} from "../controllers/category.controller";
import { protectRoute } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validation.middleware";
import {
  createCategoryValidator,
  updateCategoryValidator,
} from "../validator/category.validator";

const router = express.Router();
router.use(protectRoute);

router.post("/", createCategoryValidator, validateRequest, createCategory);
router.get("/", getAllCategories);
router.get("/:name", getCategoryByName);
router.put("/:id", updateCategoryValidator, validateRequest, updateCategory);
router.delete("/:id", deleteCategory);

export default router;
