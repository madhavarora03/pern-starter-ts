import { registerUser, validateUsername, verifyUser } from "@/controllers";
import { Router } from "express";

const router = Router();
router.route("/validate-username").post(validateUsername);
router.route("/").post(registerUser);
router.route("/:userId/verify-code").post(verifyUser);

export default router;
