import { Router } from "express";
import healthCheckRouter from "./health-check.route";

const router = Router();
router.use("/health-check", healthCheckRouter);

export default router;
