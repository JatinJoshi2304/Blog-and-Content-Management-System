import { Request, Response } from "express";
import * as postService from "../services/post.service";
import { status } from "../constants/responseStatus";
import { errorMessage, postMessage } from "../constants/responseMessage";
import errorStatusCode from "../constants/errorCode";

export const createPost = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userId = (req as any).user.id;

    const result = await postService.createPost(userId, data);
    res.status(status.CREATED).json({
      success: true,
      data: result.post,
      message: postMessage.CREATE_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      code: errorStatusCode.postErrorCode.POST_ERR_CODE_002,
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
      data: result.posts,
    });
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: errorStatusCode.postErrorCode.POST_ERR_CODE_002,
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
      data: result.post,
    });
  } catch (error: any) {
    res.status(status.NOT_FOUND).json({
      success: false,
      code: errorStatusCode.postErrorCode.POST_ERR_CODE_002,
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
      data: result.post,
      message: "Post updated successfully",
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      code: errorStatusCode.postErrorCode.POST_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};

export const updateThumbnail = async (req: Request, res: any) => {
  try {
    const id = (req as any).user.id;
    const postId = req.params.id;
    if (!req.file) {
      return res.status(status.BAD_REQUEST).json({
        success: false,
        message: errorMessage.User.INPUT_NOT_FOUND,
      });
    }

    const updatedData = {
      thumbnail: `/uploads/thumbnail/${req.file.filename}`,
    };

    const user = await postService.updatePost(id, updatedData);

    res.status(status.SUCCESS).json({
      success: true,
      data: user,
      message: postMessage.UPDATE_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
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
      message: result.message,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      code: errorStatusCode.postErrorCode.POST_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};
