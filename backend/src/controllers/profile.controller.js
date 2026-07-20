import * as profileService from "../services/profile.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getCurrentProfile = asyncHandler(async (req, res) => {

    const profile = await profileService.getProfileByUsername(req.user.username);

    return res.status(200).json(
        new ApiResponse(
            200,
            profile,
            "Profile fetched successfully"
        )
    );
});

const getPublicProfile = asyncHandler(async (req, res) => {

    const { username } = req.params;

    const profile = await profileService.getProfileByUsername(username);

    return res.status(200).json(
        new ApiResponse(
            200,
            profile,
            "Profile fetched successfully"
        )
    );
});

export {
    getCurrentProfile,
    getPublicProfile
};
