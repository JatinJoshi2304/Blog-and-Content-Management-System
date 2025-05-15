import { Request, response, Response } from "express";
import * as userService from "../services/user.service";
import { userMessage, errorMessage } from "../constants/responseMessage";
import { status } from "../constants/responseStatus";
import { uploadImageToCloudinary } from "../services/upload.service";
import { userErrorCode } from "../constants/errorCode";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      return res.status(status.NOT_FOUND).json({
        success: false,
        status: status.NOT_FOUND,
        code: userErrorCode.USER_ERR_CODE_004,
        message: errorMessage.User.NOT_FOUND,
      });
    }
    res.status(status.SUCCESS).json({
      success: true,
      status: status.SUCCESS,
      data: user,
      message: userMessage.PROFILE_FETCH_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: status.INTERNAL_SERVER_ERROR,
      code: userErrorCode.USER_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.UNKNOWN_ERROR,
    });
  }
};

export const getUserByUsername = async (req: Request, res: any) => {
  try {
    const username = req.params.username;
    const user = await userService.getUserByUsername(username);
    if (!user) {
      return res.status(status.NOT_FOUND).json({
        success: false,
        status: status.NOT_FOUND,
        code: userErrorCode.USER_ERR_CODE_004,
        message: errorMessage.User.NOT_FOUND,
      });
    }
    res.status(status.SUCCESS).json({
      success: true,
      status: status.SUCCESS,
      data: user,
      message: userMessage.FETCH_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: status.INTERNAL_SERVER_ERROR,
      code: userErrorCode.USER_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.UNKNOWN_ERROR,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const role = (req as any).user.role;

    if (role !== "admin")
      return res.status(status.UNAUTHORIZED).json({
        success: false,
        status: status.UNAUTHORIZED,
        code: userErrorCode.USER_ERR_CODE_007,
        message: errorMessage.General.UNAUTHORIZED,
      });

    const users = await userService.getAllUsers();
    res.status(status.SUCCESS).json({
      success: true,
      status: status.SUCCESS,
      data: users,
      message: userMessage.FETCH_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: status.INTERNAL_SERVER_ERROR,
      code: userErrorCode.USER_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.UNKNOWN_ERROR,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = (req as any).user.id;
    const updatedData = { ...req.body };
    const user = await userService.updateUser(id, updatedData);
    res.status(status.SUCCESS).json({
      success: true,
      status: status.SUCCESS,
      data: user,
      message: userMessage.UPDATE_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      code: userErrorCode.USER_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.UNKNOWN_ERROR,
    });
  }
};

export const uploadImage = async (req: Request, res: any) => {
  try {
    const id = (req as any).user.id;
    if (!req.file) {
      return res.status(status.BAD_REQUEST).json({
        success: false,
        status: status.BAD_REQUEST,
        code: userErrorCode.USER_ERR_CODE_008,
        message: userMessage.PROFILE_AVATAR_UPDATE_FAILED,
      });
    }

    const imageUrl = await uploadImageToCloudinary(req.file.path);

    const updatedData = { avatar: imageUrl };
    await userService.updateUser(id, updatedData);
    res.status(200).json({
      success: true,
      status: status.BAD_REQUEST,
      message: userMessage.UPDATE_SUCCESS,
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: userErrorCode.USER_ERR_CODE_002,
      message: errorMessage.General.UNKNOWN_ERROR,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(req.params.username);
    res.status(status.SUCCESS).json({
      success: true,
      message: userMessage.DELETE_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: userErrorCode.USER_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.UNKNOWN_ERROR,
    });
  }
};
