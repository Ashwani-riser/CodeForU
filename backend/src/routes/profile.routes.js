import { Router } from "express";

import {
    getCurrentProfile,
    getPublicProfile
} from "../controllers/profile.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
    "/profile",
    verifyJWT,
    getCurrentProfile
);

router.get(
    "/profile/:username",
    getPublicProfile
);

export default router;
