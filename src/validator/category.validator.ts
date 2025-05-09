import { body } from "express-validator";

export const createCategoryValidator = [
  body("name").notEmpty().withMessage("Name is required"),
];

export const updateCategoryValidator = [
  body("name").notEmpty().withMessage("Name is required"),
];
