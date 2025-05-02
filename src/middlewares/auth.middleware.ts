import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { status } from "../constants/responseStatus";
import { errorMessage } from "../constants/responseMessage";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const protectRoute = (req: Request, res: any, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(status.UNAUTHORIZED).json({
      success: false,
      message: errorMessage.Auth.UNAUTHORIZED,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as any).user = decoded; // You can attach user ID or other payload here
    next();
  } catch (error) {
    return res.status(status.UNAUTHORIZED).json({
      success: false,
      message: errorMessage.Auth.TOKEN_INVALID,
    });
  }
};
