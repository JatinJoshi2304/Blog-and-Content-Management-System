import { body } from "express-validator";

export const createPostValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isString()
    .withMessage("Content must be a string"),

  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean"),

  body("categories")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Categories must be an array of objects with id"),

  body("categories.*.id")
    .optional()
    .isUUID()
    .withMessage("Each category must have a valid UUID"),

  body("tags")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Tags must be an array of objects with id"),

  body("tags.*.id")
    .optional()
    .isUUID()
    .withMessage("Each tag must have a valid UUID"),
];
