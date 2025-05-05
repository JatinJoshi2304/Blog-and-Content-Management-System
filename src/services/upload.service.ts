// src/services/upload.service.ts
import cloudinary from "../utils/cloudinary";
import fs from "fs";

export const uploadImageToCloudinary = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });

    // Remove file from local storage
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    throw new Error("Failed to upload image to Cloudinary");
  }
};
