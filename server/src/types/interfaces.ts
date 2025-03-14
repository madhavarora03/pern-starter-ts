import { User } from "@prisma/client";

interface ApiResponseSuccess<T = unknown> {
  success: true;
  message: string;
  data: T;
}

interface ApiResponseError {
  success: false;
  message: string;
  error: unknown;
}

export type ApiResponse<T = unknown> = ApiResponseSuccess<T> | ApiResponseError;

export type UserProfile = Omit<User, "password" | "createdAt" | "updatedAt">;