import { Request, Response } from "express";
import * as postService from "../services/post.service";
import { status } from "../constants/responseStatus";
import { errorMessage, postMessage } from "../constants/responseMessage";
import { postErrorCode } from "../constants/errorCode";
import fs from "fs";
import cloudinary from "../utils/cloudinary";

export const createPost = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userId = (req as any).user.id;

    const result = await postService.createPost(userId, data);
    res.status(status.CREATED).json({
      success: true,
      status: status.CREATED,
      data: result.post,
      message: postMessage.CREATE_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      code: postErrorCode.POST_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const result = await postService.getAllPosts(userId);
    res.status(status.SUCCESS).json({
      success: true,
      status: status.SUCCESS,
      data: result.posts,
    });
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: status.INTERNAL_SERVER_ERROR,
      code: postErrorCode.POST_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.UNKNOWN_ERROR,
    });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await postService.getPostById(id);
    res.status(status.SUCCESS).json({
      success: true,
      status: status.SUCCESS,
      data: result.post,
    });
  } catch (error: any) {
    res.status(status.NOT_FOUND).json({
      success: false,
      status: status.NOT_FOUND,
      code: postErrorCode.POST_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.NOT_FOUND,
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await postService.updatePost(id, data);
    res.status(status.SUCCESS).json({
      success: true,
      status: status.SUCCESS,
      data: result.post,
      message: "Post updated successfully",
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      code: postErrorCode.POST_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};

export const updateThumbnail = async (req: Request, res: any) => {
  const userId = (req as any).user.id;
  const postId = req.params.id;

  if (!req.file) {
    return res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      message: errorMessage.User.INPUT_NOT_FOUND,
    });
  }

  const localFilePath = req.file.path;

  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "thumbnails",
    });

    // Clean up local file after upload
    fs.unlinkSync(localFilePath);

    // Save Cloudinary URL in DB
    const updatedData = {
      thumbnail: result.secure_url,
    };

    const updatedPost = await postService.updatePost(postId, updatedData);

    return res.status(status.SUCCESS).json({
      success: true,
      status: status.SUCCESS,
      data: updatedPost,
      message: postMessage.UPDATE_SUCCESS,
    });
  } catch (error: any) {
    // Clean up temp file if upload or DB fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: status.INTERNAL_SERVER_ERROR,
      code: postErrorCode.POST_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.UNKNOWN_ERROR,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await postService.deletePost(id);
    res.status(status.SUCCESS).json({
      success: true,
      status: status.SUCCESS,
      message: result.message,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      code: postErrorCode.POST_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};
