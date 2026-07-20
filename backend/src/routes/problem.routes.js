import { Router } from "express";

import {
      createProblem,
    getAllProblems,
    getProblemBySlug,
    updateProblem,
    deleteProblem
} from "../controllers/problem.controller.js";

import { verifyJWT }
from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.post(
    "/",
    verifyJWT,
    verifyAdmin,
    createProblem
);

router.get(
    "/",
    getAllProblems
);

// Single Problem
router.get(
    "/:slug",
    getProblemBySlug
);

// Update Problem
router.patch(
    "/:id",
    verifyJWT,
    verifyAdmin,
    updateProblem
);

// Delete Problem
router.delete(
    "/:id",
    verifyJWT,
    verifyAdmin,
    deleteProblem
);

export default router;