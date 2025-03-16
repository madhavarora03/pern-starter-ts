import { User } from "@prisma/client";
import HttpError from "./HttpError";
import prisma from "./db";
import jwt, { SignOptions } from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "@/config";
import logger from "./logger";

function generateAccessToken({ id, email, username }: User): string {
  return jwt.sign({ id, email, username }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  } as SignOptions);
}

function generateRefreshToken(id: string): string {
  return jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  } as SignOptions);
}

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function generateAccessAndRefreshTokens(
  userId: string
): Promise<TokenResponse> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user.id);

    user.refreshToken = refreshToken;

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    logger.error("Error generating tokens: ", error);
    throw new HttpError(500, "Something went wrong while generating tokens");
  }
}
