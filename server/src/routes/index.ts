import { Router } from "express";
import healthCheckRouter from "./health-check.route";
import userRouter from "./user.route";

const router = Router();
router.use("/health-check", healthCheckRouter);
router.use("/user", userRouter);

export default router;
