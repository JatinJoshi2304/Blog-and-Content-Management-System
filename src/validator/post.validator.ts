import { body } from "express-validator";

export const createPostValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean"),
  body("publishedAt")
    .optional()
    .isISO8601()
    .withMessage("PublishedAt must be a valid ISO date"),
  body("tagIds")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of IDs"),
  body("categoryIds")
    .optional()
    .isArray()
    .withMessage("Categories must be an array of IDs"),
];
