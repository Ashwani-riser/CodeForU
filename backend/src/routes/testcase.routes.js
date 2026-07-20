import { Router } from "express";

import {
    createTestCase,
    getProblemTestCases
} from "../controllers/testcase.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
const router = Router();

router.post(
    "/",
    verifyJWT,
    verifyAdmin,
    createTestCase
);

router.get(
    "/:problemId",
    verifyJWT,
    verifyAdmin,
    getProblemTestCases
);

export default router;