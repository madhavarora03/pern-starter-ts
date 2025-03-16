import { ApiResponse, UserProfile } from "@/types/interfaces";
import catchAsync from "@/utils/catchAsync";
import prisma from "@/utils/db";
import HttpError from "@/utils/HttpError";
import { sendVerificationEmail, sendWelcomeEmail } from "@/utils/email";
import {
  usernameValidationSchema,
  userRegisterSchema,
  userVerificationSchema,
} from "@/validations";
import { Request, Response } from "express";

export const validateUsername = catchAsync(
  async (
    req: Request,
    res: Response<ApiResponse<string>>
  ): Promise<Response<ApiResponse<string>>> => {
    const validatedBody = usernameValidationSchema.safeParse(req.body);

    if (!validatedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid username format",
        error: validatedBody.error.errors,
      });
    }

    const { username } = validatedBody.data;

    const existingUser = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken",
        error: "The username is already taken. Please try another one.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Username is available",
      data: username,
    });
  }
);

export const registerUser = catchAsync(
  async (
    req: Request,
    res: Response<ApiResponse<UserProfile>>
  ): Promise<Response<ApiResponse<UserProfile>>> => {
    const validatedBody = userRegisterSchema.safeParse(req.body);

    if (!validatedBody.success) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
        error: validatedBody.error.errors,
      });
    }

    const { email, name, username, password } = validatedBody.data;

    // Check if any user already exists with the given username
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken",
        error: "The username is already taken. Please try another one.",
      });
    }

    // Check if a user already exists with the provided email.
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
        error: "User already exists with this email.",
      });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const verificationExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    // Create a new user record since no user exists with the given email.
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        username,
        password,
        verificationCode,
        verificationExpiry,
        isVerified: false,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        googleId: true,
        isVerified: true,
        verificationCode: true,
        verificationExpiry: true,
        refreshToken: true,
      },
    });

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verificationCode
    );

    if (!emailResponse.success) {
      throw new HttpError(500, "Failed to send verification email");
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: newUser,
    });
  }
);

export const verifyUser = catchAsync(
  async (
    req: Request,
    res: Response<ApiResponse<UserProfile>>
  ): Promise<Response<ApiResponse<UserProfile>>> => {
    const validatedBody = userVerificationSchema.safeParse(req.body);

    if (!validatedBody.success) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
        error: validatedBody.error.errors,
      });
    }

    const { verificationCode } = validatedBody.data;

    const user = await prisma.user.findUnique({
      where: {
        id: req.params.userId,
      },

      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        googleId: true,
        isVerified: true,
        verificationCode: true,
        verificationExpiry: true,
        refreshToken: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
        error: "User does not exist",
      });
    }

    if (user.isVerified) {
      return res.status(200).json({
        success: true,
        message: "User is already verified",
        data: user,
      });
    }

    const isCodeValid = verificationCode === user.verificationCode;
    const isCodeNotExpired =
      user.verificationExpiry &&
      new Date(user.verificationExpiry!) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isVerified: true,
        },
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
          googleId: true,
          isVerified: true,
          verificationCode: true,
          verificationExpiry: true,
          refreshToken: true,
        },
      });

      const emailResponse = await sendWelcomeEmail(user.email, user.username);

      if (!emailResponse.success) {
        throw new HttpError(500, "Failed to send welcome email");
      }

      return res.status(200).json({
        success: true,
        message: "User verified successfully",
        data: updatedUser,
      });
    } else if (!isCodeNotExpired) {
      // Code is expired
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please generate a new code.",
        error: "Verification code has expired. Please generate a new code.",
      });
    } else {
      // Invalid code
      return res.status(400).json({
        success: false,
        message: "Incorrect verification code",
        error: "Incorrect verification code",
      });
    }
  }
);
