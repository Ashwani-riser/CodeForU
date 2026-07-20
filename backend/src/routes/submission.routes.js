import { Router } from "express";

import {
    runCode,
    createSubmission,
    getMySubmissions,
    getAllSubmissions,
    getSubmissionById
} from "../controllers/submission.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { submissionLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

// Run Code (does not save to DB)
router.post(
    "/run",
    verifyJWT,
    submissionLimiter,
    runCode
);

// Create Practice Submission
router.post(
    "/",
    verifyJWT,
    submissionLimiter,
    createSubmission
);

// Current User Submissions
router.get(
    "/my",
    verifyJWT,
    getMySubmissions
);

// Get All Submissions (with filters, pagination)
router.get(
    "/",
    verifyJWT,
    getAllSubmissions
);

// Get Single Submission
router.get(
    "/:submissionId",
    verifyJWT,
    getSubmissionById
);

export default router;