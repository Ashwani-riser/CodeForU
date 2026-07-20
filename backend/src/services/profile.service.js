import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Submission } from "../models/submission.model.js";
import { ApiError } from "../utils/ApiError.js";

const getProfileByUsername = async (username) => {

    const user = await User.findOne({ username })
        .select("-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry -passwordResetToken -passwordResetTokenExpiry")
        .lean();

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const userId = user._id;

    const [
        totalSubmissions,
        acceptedSubmissions,
        solvedProblemsAgg,
        difficultyStatsAgg,
        languageStatsAgg,
        recentSubmissions,
        heatmapAgg
    ] = await Promise.all([

        Submission.countDocuments({ userId }),

        Submission.countDocuments({ userId, verdict: "Accepted" }),

        Submission.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), verdict: "Accepted" } },
            { $group: { _id: "$problemId" } },
            { $count: "count" }
        ]),

        Submission.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), verdict: "Accepted" } },
            {
                $lookup: {
                    from: "problems",
                    localField: "problemId",
                    foreignField: "_id",
                    as: "problem"
                }
            },
            { $unwind: "$problem" },
            {
                $group: {
                    _id: "$problem.difficulty",
                    count: { $sum: 1 }
                }
            }
        ]),

        Submission.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: "$language",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]),

        Submission.find({ userId })
            .select("-sourceCode -compileError")
            .populate("problemId", "title difficulty slug")
            .sort({ createdAt: -1 })
            .limit(10)
            .lean(),

        Submission.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            { $limit: 365 }
        ])

    ]);

    const totalSolved = solvedProblemsAgg.length > 0 ? solvedProblemsAgg[0].count : 0;
    const accuracy = totalSubmissions > 0
        ? Math.round((acceptedSubmissions / totalSubmissions) * 100 * 10) / 10
        : 0;

    const solvedByDifficulty = { Easy: 0, Medium: 0, Hard: 0 };
    difficultyStatsAgg.forEach(stat => {
        solvedByDifficulty[stat._id] = stat.count;
    });

    const languageStats = languageStatsAgg.map(stat => ({
        language: stat._id,
        count: stat.count
    }));

    const heatmap = heatmapAgg.map(entry => ({
        date: entry._id,
        count: entry.count
    }));

    return {
        user,
        stats: {
            totalSubmissions,
            acceptedSubmissions,
            solvedProblems: totalSolved,
            accuracy,
            solvedByDifficulty
        },
        languageStats,
        recentSubmissions,
        heatmap
    };
};

export { getProfileByUsername };
