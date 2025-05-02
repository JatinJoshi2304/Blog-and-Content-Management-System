import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { status } from "../constants/responseStatus";
import { userMessage } from "../constants/responseMessage";
import { errorMessage } from "../constants/responseMessage";
import { LoginInput, SignupInput } from "../Interfaces/auth.interface";

export const signup = async (req: Request<SignupInput>, res: Response) => {
  try {
    const { user, token } = await authService.signupUser(req.body);
    res.status(status.SUCCESS).json({
      success: true,
      data: { username: user.username, email: user.email },
      token,
      message: userMessage.SIGNUP_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      error: error.message,
      message: errorMessage.General.BAD_REQUEST,
    });
  }
};

export const login = async (req: Request<LoginInput>, res: Response) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    res.status(status.SUCCESS).json({
      success: true,
      data: user,
      token,
      message: userMessage.LOGIN_SUCCESS,
    });
  } catch (error: any) {
    res.status(status.UNAUTHORIZED).json({
      success: false,
      error: error.message,
      message: errorMessage.General.UNKNOWN_ERROR,
    });
  }
};
