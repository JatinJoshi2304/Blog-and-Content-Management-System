import { Request, Response } from "express";
import * as categoryService from "../services/category.service";
import { status } from "../constants/responseStatus";
import { errorMessage, categoryMessage } from "../constants/responseMessage";
import { categoryErrorCode } from "../constants/errorCode";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userId = (req as any).user.id;

    const result = await categoryService.createCategory(userId, data);
    res.status(status.CREATED).json({
      success: true,
      statusCode: status.CREATED,
      data: result.category,
      message: categoryMessage.CREATE_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      errorCode: categoryErrorCode.CATEGORY_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const result = await categoryService.getAllCategories(userId);
    res.status(status.SUCCESS).json({
      success: true,
      statusCode: status.SUCCESS,
      data: result.categories,
      message: categoryMessage.FETCH_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      errorCode: categoryErrorCode.CATEGORY_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};

export const getCategoryByName = async (req: Request, res: Response) => {
  try {
    const categoryName = req.params.name;

    const result = await categoryService.getCategoryByName(categoryName);

    res.status(status.SUCCESS).json({
      success: true,
      statusCode: status.SUCCESS,
      data: result.category,
      message: categoryMessage.FETCH_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.NOT_FOUND).json({
      success: false,
      status: status.NOT_FOUND,
      errorCode: categoryErrorCode.CATEGORY_ERR_CODE_001,
      error: error.message,
      message: errorMessage.General.NOT_FOUND,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const updateData = req.body;

    const result = await categoryService.updateCategory(categoryId, updateData);

    res.status(status.SUCCESS).json({
      success: true,
      statusCode: status.SUCCESS,
      data: result.category,
      message: categoryMessage.UPDATE_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      errorCode: categoryErrorCode.CATEGORY_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;

    await categoryService.deleteCategory(categoryId);

    res.status(status.SUCCESS).json({
      success: true,
      statusCode: status.SUCCESS,
      message: categoryMessage.DELETE_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      status: status.BAD_REQUEST,
      errorCode: categoryErrorCode.CATEGORY_ERR_CODE_002,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};
