import { Problem } from "../models/problem.model.js";
import { TestCase } from "../models/testcase.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProblem = asyncHandler(async (req, res) => {

    const {
        title,
        slug,
        statement,
        difficulty,
        constraints,
        inputFormat,
        outputFormat,
        sampleTestCases,
        tags
    } = req.body;

    if (!sampleTestCases || !Array.isArray(sampleTestCases) || sampleTestCases.length < 3) {
        throw new ApiError(400, "At least 3 sample test cases are required");
    }

    const existedProblem =
        await Problem.findOne({
            $or: [
                { title },
                { slug }
            ]
        });

    if (existedProblem) {
        throw new ApiError(
            409,
            "Problem already exists"
        );
    }

    const problem =
        await Problem.create({
            title,
            slug,
            statement,
            difficulty,
            constraints,
            inputFormat,
            outputFormat,
            sampleTestCases,
            tags,
            createdBy: req.user._id
        });

    return res.status(201).json(
        new ApiResponse(
            201,
            problem,
            "Problem created successfully"
        )
    );
});

const getAllProblems = asyncHandler(async (req, res) => {

    const {
        search = "",
        difficulty = "",
        tags = "",
        page = 1,
        limit = 20,
        sort = "createdAt",
        order = "desc"
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter = {};

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { slug: { $regex: search, $options: "i" } }
        ];
    }

    if (difficulty) {
        filter.difficulty = difficulty;
    }

    if (tags) {
        const tagArray = tags.split(",").map(t => t.trim()).filter(Boolean);
        if (tagArray.length > 0) {
            filter.tags = { $in: tagArray };
        }
    }

    const sortField = sort || "createdAt";
    const sortOrder = order === "asc" ? 1 : -1;

    const [problems, totalProblems] = await Promise.all([
        Problem.find(filter)
            .select("title slug difficulty tags")
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limitNum)
            .lean(),
        Problem.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalProblems / limitNum);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                problems,
                pagination: {
                    totalProblems,
                    currentPage: pageNum,
                    totalPages,
                    hasNextPage: pageNum < totalPages,
                    hasPrevPage: pageNum > 1
                }
            },
            "Problems fetched successfully"
        )
    );
});

const getProblemBySlug = asyncHandler(async (req, res) => {

    const { slug } = req.params;

    const problem = await Problem.findOne({ slug })
        .select("-__v")
        .populate("createdBy", "username fullName")
        .lean();

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            problem,
            "Problem fetched successfully"
        )
    );
});

const updateProblem = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const problem = await Problem.findById(id);

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    const updateData = { ...req.body };

    if (updateData.sampleTestCases) {
        if (!Array.isArray(updateData.sampleTestCases) || updateData.sampleTestCases.length < 3) {
            throw new ApiError(400, "At least 3 sample test cases are required");
        }
    }

    const updatedProblem = await Problem.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true
        }
    ).select("-__v");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedProblem,
            "Problem updated successfully"
        )
    );
});

const deleteProblem = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const problem = await Problem.findById(id);

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    await TestCase.deleteMany({ problemId: id });
    await problem.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Problem deleted successfully"
        )
    );
});

export {
    createProblem,
    getAllProblems,
    getProblemBySlug,
    updateProblem,
    deleteProblem
};
