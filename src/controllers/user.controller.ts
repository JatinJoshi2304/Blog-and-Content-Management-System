import { Request, response, Response } from "express";
import * as userService from "../services/user.service";
import { userMessage, errorMessage } from "../constants/responseMessage";
import { status } from "../constants/responseStatus";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res
        .status(status.NOT_FOUND)
        .json({ success: false, message: errorMessage.User.NOT_FOUND });
    }
    res.status(status.SUCCESS).json({
      success: true,
      data: user,
      message: userMessage.PROFILE_FETCH_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
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
      return res
        .status(status.NOT_FOUND)
        .json({ success: false, message: errorMessage.User.NOT_FOUND });
    }
    res
      .status(status.SUCCESS)
      .json({ success: true, data: user, message: userMessage.FETCH_SUCCESS });
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
      message: errorMessage.General.UNKNOWN_ERROR,
    });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res
      .status(status.SUCCESS)
      .json({ success: true, data: users, message: userMessage.FETCH_SUCCESS });
  } catch (error: any) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
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
    if (req.file) {
      updatedData.avatar = `/uploads/avatars/${req.file.filename}`;
    }
    res
      .status(status.SUCCESS)
      .json({ success: true, data: user, message: userMessage.UPDATE_SUCCESS });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      error: error.message,
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
      error: error.message,
      message: errorMessage.General.UNKNOWN_ERROR,
    });
  }
};
