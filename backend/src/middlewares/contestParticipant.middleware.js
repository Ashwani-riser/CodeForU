import { ApiError } from "../utils/ApiError.js";

export const verifyContestParticipant = (req, res, next) => {

    const contest = req.contest;

    if (req.user.role === "admin") {
        return next();
    }

    const registered = contest.participants.some(
        participant =>
            participant.toString() === req.user._id.toString()
    );

    if (!registered) {
        throw new ApiError(
            403,
            "Please register for this contest first"
        );
    }

    next();
};