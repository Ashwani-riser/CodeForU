import mongoose from "mongoose";

const testcaseSchema = new mongoose.Schema(
    {
        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true
        },

        input: {
            type: String,
            required: true
        },

        expectedOutput: {
            type: String,
            required: true
        },

        isHidden: {//hidden test cases
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export const TestCase = mongoose.model(
    "TestCase",
    testcaseSchema
);