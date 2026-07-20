import { Submission } from "../models/submission.model.js";
import { Problem } from "../models/problem.model.js";
import { judgeSubmission } from "../judge/judgeSubmission.js";
import { ApiError } from "../utils/ApiError.js";
import { runCpp } from "../judge/runCpp.js";
import { runC } from "../judge/runC.js";
import { runJava } from "../judge/runJava.js";
import { runPython } from "../judge/runPython.js";


const runCode = async (body) => {

    const {
        language,
        sourceCode,
        input = ""
    } = body;

   if (
    !language ||
    !sourceCode ||
    sourceCode.trim() === ""
) {
    throw new ApiError(
        400,
        "Language and source code are required"
    );
}

    const runners = {
        c: runC,
        cpp: runCpp,
        java: runJava,
        python: runPython
    };

    const runner = runners[language];

    if (!runner) {
        throw new ApiError(
            400,
            "Unsupported programming language"
        );
    }

    try {
    return await runner(
        sourceCode,
        input
    );
    } catch (error) {
    throw new ApiError(
        500,
        "Failed to execute code"
    );

    }
};


const createSubmission = async (user, body) => {

    const {
        problemId,
        language,
        sourceCode
    } = body;

    const problem = await Problem.findById(problemId);

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    const submission = await Submission.create({
        userId: user._id,
        problemId,
        language,
        sourceCode,
        verdict: "Pending"
         
    });

    await judgeSubmission(submission._id);

    const updatedSubmission = await Submission.findById(submission._id)
        .populate("userId", "username fullName")
        .populate("problemId", "title difficulty")
        .populate("contestId", "title")
        .lean();

    return updatedSubmission;
};
const getMySubmissions = async (user) => {

    const submissions = await Submission.find({
        userId: user._id
    })
        .select("-sourceCode")
        .populate("problemId", "title difficulty")
        .sort({ createdAt: -1 })
        .lean();

    return submissions;
};
const getAllSubmissions = async (user, query) => {

    let {
        page = 1,
        limit = 10,
        verdict,
        problemId,
        contestId,
        type,
        sortBy = "createdAt",
        order = "desc"
    } = query;

    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const filter = {};

    // Normal users can only view their submissions
    if (user.role !== "ADMIN") {
        filter.userId = user._id;
    }

    // Verdict Filter
    if (verdict) {
        filter.verdict = verdict;
    }

    // Problem Filter
    if (problemId) {
        filter.problemId = problemId;
    }

    // Contest Filter
    if (contestId) {
        filter.contestId = contestId;
    }

    // Practice / Contest filter
    if (type === "practice") {
        filter.contestId = null;
    }

    if (type === "contest") {
        filter.contestId = { $ne: null };
    }

    const sort = {
        [sortBy]: order === "asc" ? 1 : -1
    };

    const [submissions, total] = await Promise.all([

        Submission.find(filter)
            .populate("userId", "username fullName")
            .populate("problemId", "title difficulty")
            .populate("contestId", "title")
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean(),

        Submission.countDocuments(filter)

    ]);

    return {
        submissions,

        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};
const getSubmissionById = async (submissionId, user) => {

    const submission = await Submission.findById(submissionId)
        .populate("userId", "username fullName")
        .populate("problemId", "title difficulty")
        .populate("contestId", "title")
        .lean();

    if (!submission) {
        throw new ApiError(404, "Submission not found");
    }

    if (
        user.role !== "ADMIN" &&
        submission.userId._id.toString() !== user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You are not authorized to view this submission"
        );
    }

    return submission;
};

export {
    runCode,
    createSubmission,
    getMySubmissions,
    getAllSubmissions,
    getSubmissionById
};