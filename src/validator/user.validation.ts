import { body } from "express-validator";

export const updateUserValidation = [
  body("username").optional().isString().isLength({ min: 3 }),
  body("name").optional().isString(),
  body("bio").optional().isString(),
  body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),
  body("twitter").optional().isURL().withMessage("Twitter must be a valid URL"),
  body("github").optional().isURL().withMessage("GitHub must be a valid URL"),
  body("linkedin")
    .optional()
    .isURL()
    .withMessage("LinkedIn must be a valid URL"),
];

export const createUserValidation = [
  body("username")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const loginUserValidation = [
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
