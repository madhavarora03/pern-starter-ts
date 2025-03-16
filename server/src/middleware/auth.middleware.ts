import { ACCESS_TOKEN_SECRET } from "@/config";
import { ApiResponse, AuthenticatedRequest } from "@/types/interfaces";
import catchAsync from "@/utils/catchAsync";
import prisma from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";

export const verifyJwt = catchAsync(
  async (req: AuthenticatedRequest, res: Response<ApiResponse>, next) => {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
        error: "unauthorized request",
      });
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

    const user = await prisma.user.findFirst({
      where: { id: decodedToken.id },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        refreshToken: true,
        isVerified: true,
        verificationCode: true,
        verificationExpiry: true,
        googleId: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
        error: "Invalid access token",
      });
    }

    req.user = user;
    next();
  }
);
