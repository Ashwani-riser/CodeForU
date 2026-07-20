import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        statement: {
            type: String,
            required: true
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true
        },

        constraints: {
            type: String,
            required: true
        },

        inputFormat: {
            type: String,
            required: true
        },

        outputFormat: {
            type: String,
            required: true
        },

        sampleTestCases: [
            {
                input: {
                    type: String,
                    required: true
                },
                output: {
                    type: String,
                    required: true
                },
                explanation: {
                    type: String,
                    default: ""
                }
            }
        ],

        tags: [{
            type: String
        }],

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Problem = mongoose.model(
    "Problem",
    problemSchema
);