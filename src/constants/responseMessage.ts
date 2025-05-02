export const userMessage = {
  SIGNUP_SUCCESS: "User signed up successfully",
  LOGIN_SUCCESS: "User logged in successfully",
  FETCH_SUCCESS: "User fetched successfully",
  UPDATE_SUCCESS: "User updated successfully",
  DELETE_SUCCESS: "User deleted successfully",
  NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "You are not authorized to perform this action",
  EMAIL_ALREADY_EXISTS: "Email is already registered",
  PROFILE_FETCH_SUCCESS: "User profile fetched successfully",
  PROFILE_UPDATE_SUCCESS: "User profile updated successfully",
};

export const errorMessage = {
  Auth: {
    INVALID_CREDENTIALS: "Invalid email or password",
    UNAUTHORIZED: "You are not authorized to access this resource",
    TOKEN_EXPIRED: "Authentication token has expired",
    TOKEN_INVALID: "Invalid authentication token",
    FORBIDDEN: "Access forbidden for this role",
  },
  User: {
    NOT_FOUND: "User not found",
    EMAIL_EXISTS: "Email is already in use",
    VALIDATION_FAILED: "User data validation failed",
    PROFILE_UPDATE_FAILED: "Failed to update user profile",
    INPUT_NOT_FOUND: "No image file uploaded",
  },
  Post: {
    NOT_FOUND: "Post not found",
    CREATE_FAILED: "Failed to create post",
    UPDATE_FAILED: "Failed to update post",
    DELETE_FAILED: "Failed to delete post",
    UNAUTHORIZED: "You are not authorized to modify this post",
  },
  Comment: {
    NOT_FOUND: "Comment not found",
    CREATE_FAILED: "Failed to add comment",
    DELETE_FAILED: "Failed to delete comment",
    UNAUTHORIZED: "You are not authorized to manage this comment",
  },
  Category: {
    NOT_FOUND: "Category not found",
    CREATE_FAILED: "Failed to create category",
    DELETE_FAILED: "Failed to delete category",
  },
  Tag: {
    NOT_FOUND: "Tag not found",
    CREATE_FAILED: "Failed to create tag",
    DELETE_FAILED: "Failed to delete tag",
  },
  Media: {
    UPLOAD_FAILED: "Failed to upload media",
    INVALID_TYPE: "Unsupported media file type",
    FILE_TOO_LARGE: "Media file size exceeds the allowed limit",
    NOT_FOUND: "Media not found",
  },
  General: {
    UNKNOWN_ERROR: "Something went wrong. Please try again later",
    BAD_REQUEST: "Bad request",
    NOT_FOUND: "Resource not found",
    VALIDATION_FAILED: "Validation failed",
    DATABASE_ERROR: "A database error occurred",
    UNAUTHORIZED: "Access denied. Admins only",
  },
};
