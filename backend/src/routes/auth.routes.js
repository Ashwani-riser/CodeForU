import { Router } from "express";
import {
    registerUser,
    loginUser,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    getCurrentUser
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
const router = Router();
 
router.post("/register",authLimiter, registerUser);
router.post("/login",  authLimiter, loginUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification",authLimiter,resendVerificationEmail);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password/:token", authLimiter, resetPassword);
router.get("/currentUser", verifyJWT, getCurrentUser);

export default router;