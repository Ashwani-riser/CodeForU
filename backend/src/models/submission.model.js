// src/models/submission.model.js

import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true
        },

        language: {
            type: String,
            enum: ["c", "cpp", "java", "python"],
            lowercase: true,
            trim: true,
            required: true
        },

        sourceCode: {
            type: String,
            required: true
        },

        verdict: {
            type: String,
            enum: [
                "Pending",
                "Accepted",
                "Wrong Answer",
                "Compilation Error",
                "Runtime Error",
                "Time Limit Exceeded"
            ],
            default: "Pending"
        },

        executionTime: {
            type: Number,
            default: 0
        },

        compileError: {
            type: String,
            default: null
        },

        contestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contest",
            default: null
        }
    },
    {
        timestamps: true
    }
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
| These indexes improve query performance for:
| - User submission history
| - Problem-wise submissions
| - Contest submissions
| - Verdict filtering
| - Leaderboard aggregation
|--------------------------------------------------------------------------
*/

// User submission history (latest first)
submissionSchema.index({
    userId: 1,
    createdAt: -1
});

// Problem submissions
submissionSchema.index({
    problemId: 1
});

// Contest submissions
submissionSchema.index({
    contestId: 1
});

// Verdict filtering
submissionSchema.index({
    verdict: 1
});

// Leaderboard optimization
submissionSchema.index({
    contestId: 1,
    userId: 1,
    createdAt: 1
});

export const Submission = mongoose.model(
    "Submission",
    submissionSchema
);