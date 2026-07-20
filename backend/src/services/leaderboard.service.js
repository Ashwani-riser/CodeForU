// src/services/leaderboard.service.js

import mongoose from "mongoose";
import { Contest } from "../models/contest.model.js";
import { Submission } from "../models/submission.model.js";
import calculatePenalty from "../helpers/penalty.helper.js";
import {ApiError} from "../utils/ApiError.js";

const getLeaderboard = async (contestId) => {

    // Fetch contest
    const contest = await Contest.findById(contestId)
        .select("startTime problems")
        .populate("problems", "title slug");

    if (!contest) {
        throw new ApiError(404, "Contest not found");
    }

    // Aggregate submissions grouped by user
    const users = await Submission.aggregate([
        {
            $match: {
                contestId: new mongoose.Types.ObjectId(contestId)
            }
        },
        {
            $sort: {
                createdAt: 1
            }
        },
        {
            $group: {
                _id: "$userId",
                submissions: {
                    $push: {
                        problemId: "$problemId",
                        verdict: "$verdict",
                        createdAt: "$createdAt"
                    }
                }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                _id: 0,
                user: {
                    _id: "$user._id",
                    username: "$user.username"
                },
                submissions: 1
            }
        }
    ]);

    // Contest problem metadata
    const problemMap = new Map();

    contest.problems.forEach((problem, index) => {

        const code = String.fromCharCode(65 + index); // A, B, C...

        problemMap.set(problem._id.toString(), {
            order: index,
            code,
            title: problem.title,
            slug: problem.slug
        });

    });

    const leaderboard = [];

    for (const contestant of users) {

        const stats = calculatePenalty(
            contestant.submissions,
            contest.startTime
        );

        // Add problem details
        stats.results = stats.results.map(result => {

            const problem = problemMap.get(result.problemId);

            return {
                ...result,
                code: problem?.code,
                title: problem?.title,
                slug: problem?.slug
            };

        });

        // Sort according to contest problem order
        stats.results.sort((a, b) => {

            const orderA =
                problemMap.get(a.problemId)?.order ??
                Number.MAX_SAFE_INTEGER;

            const orderB =
                problemMap.get(b.problemId)?.order ??
                Number.MAX_SAFE_INTEGER;

            return orderA - orderB;
        });

        leaderboard.push({
            user: contestant.user,
            solved: stats.solved,
            penalty: stats.penalty,
            lastAcTime: stats.lastAcTime,
            results: stats.results
        });

    }

    // Codeforces sorting
    leaderboard.sort((a, b) => {

        if (a.solved !== b.solved)
            return b.solved - a.solved;

        if (a.penalty !== b.penalty)
            return a.penalty - b.penalty;

        if (a.lastAcTime !== b.lastAcTime)
            return a.lastAcTime - b.lastAcTime;

        return a.user.username.localeCompare(b.user.username);

    });

    // Rank calculation
    let previous = null;

    for (let i = 0; i < leaderboard.length; i++) {

        if (
            previous &&
            leaderboard[i].solved === previous.solved &&
            leaderboard[i].penalty === previous.penalty &&
            leaderboard[i].lastAcTime === previous.lastAcTime
        ) {

            leaderboard[i].rank = previous.rank;

        } else {

            leaderboard[i].rank = i + 1;

        }

        previous = leaderboard[i];

    }

    // Remove internal field
    leaderboard.forEach(user => {
        delete user.lastAcTime;
    });

    return leaderboard;

};

export default getLeaderboard;