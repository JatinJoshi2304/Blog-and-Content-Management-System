import { body } from "express-validator";

export const createCommentValidator = [
  body("content").notEmpty().withMessage("Content is required"),
];
