import mongoose from "mongoose";

import { TestCase } from "../models/testcase.model.js";
import { Problem } from "../models/problem.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTestCase = asyncHandler(async (req, res) => {
    const {
        problemId,
        input,
        expectedOutput,
        isHidden = true
    } = req.body;

    // Validation
    if (!problemId || !input || !expectedOutput) {
        throw new ApiError(400, "All fields are required");
    }
    
    
     if (!mongoose.Types.ObjectId.isValid(problemId)) {
        throw new ApiError(400, "Invalid Problem ID");
    }
    
    // Check if problem exists
    const problem = await Problem.findById(problemId);

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    // Create testcase
    const testCase = await TestCase.create({
        problemId,
        input,
        expectedOutput,
        isHidden
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            testCase,
            "Test case created successfully"
        )
    );
});

const getProblemTestCases = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    
    
     if (!mongoose.Types.ObjectId.isValid(problemId)) {
        throw new ApiError(400, "Invalid Problem ID");
    }
    // Check if problem exists
     const problem = await Problem.findById(problemId);

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    const testCases = await TestCase.find({ problemId });

    return res.status(200).json(
        new ApiResponse(
            200,
            testCases,
            "Test cases fetched successfully"
        )
    );
});

export {
    createTestCase,
    getProblemTestCases
};