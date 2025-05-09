import { Request, Response } from "express";
import * as commentService from "../services/comment.service";
import { status } from "../constants/responseStatus";
import { errorMessage, commentMessage } from "../constants/responseMessage";
import { commentErrorCode } from "../constants/errorCode";
import { ICommentRequest } from "../interfaces/comment.interface";

export const createComment = async (req: ICommentRequest, res: Response) => {
  try {
    const data = req.body;
    const userId = req.user.id;
    const postId = req.params.id;
    const result = await commentService.createComment(
      userId,
      postId,
      null,
      data
    );
    res.status(status.CREATED).json({
      success: true,
      statusCode: status.CREATED,
      data: result.comment,
      message: commentMessage.CREATE_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      errorCode: commentErrorCode.COMMENT_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};

export const replyComment = async (req: ICommentRequest, res: Response) => {
  try {
    const data = req.body;
    const userId = req.user.id;
    const postId = req.params.id;
    const superParentId = req.params?.superParentId;

    const result = await commentService.createComment(
      userId,
      postId,
      superParentId ?? null,
      data
    );
    res.status(status.CREATED).json({
      success: true,
      statusCode: status.CREATED,
      data: result.comment,
      message: commentMessage.CREATE_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      errorCode: commentErrorCode.COMMENT_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const result = await commentService.getAllComments(postId);
    res.status(status.SUCCESS).json({
      success: true,
      statusCode: status.SUCCESS,
      data: result.comments,
      message: commentMessage.FETCH_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      errorCode: commentErrorCode.COMMENT_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};

export const updateComment = async (req: ICommentRequest, res: Response) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;
    const data = req.body;
    const result = await commentService.updateComment(commentId, userId, data);
    res.status(status.SUCCESS).json({
      success: true,
      statusCode: status.SUCCESS,
      data: result.comment,
      message: commentMessage.FETCH_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      errorCode: commentErrorCode.COMMENT_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};

export const deleteComment = async (req: ICommentRequest, res: Response) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;
    await commentService.deleteComment(commentId, userId);
    res.status(status.SUCCESS).json({
      success: true,
      statusCode: status.SUCCESS,
      message: commentMessage.DELETE_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      errorCode: commentErrorCode.COMMENT_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};
