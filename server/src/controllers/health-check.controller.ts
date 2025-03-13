import { ApiResponse } from "@/types/interfaces";
import catchAsync from "@/utils/catchAsync";
import { Response } from "express";

export const healthCheck = catchAsync((_, res: Response<ApiResponse<null>>) => {
  return res.status(200).json({
    message: "Health check passed - Server is running smoothly ✅",
    data: null,
    success: true,
  });
});
