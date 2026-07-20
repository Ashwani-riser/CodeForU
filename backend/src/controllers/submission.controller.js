import * as submissionService from "../services/submission.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const runCode = asyncHandler(async (req, res) => {
    const result = await submissionService.runCode(req.body);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Code executed successfully"
        )
    );
});
const createSubmission = asyncHandler(async (req, res) => {
    //  req leta hai
    //  service call karta hai
    //   response bhejta hai
    const submission = await submissionService.createSubmission(
        req.user,
        req.body
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            submission,
            "Submission judged successfully"
        )
    );
});                                                                                                                                                                                                                                                                                                                                                                                
const getMySubmissions = asyncHandler(async (req, res) => {

    const submissions =
        await submissionService.getMySubmissions(req.user);

    return res.status(200).json(
        new ApiResponse(
            200,
            submissions,
            "Submissions fetched successfully"
        )
    );

});

const getAllSubmissions = asyncHandler(async (req, res) => {

    const result = await submissionService.getAllSubmissions(
        req.user,
        req.query
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Submissions fetched successfully"
        )
    );

});

const getSubmissionById = asyncHandler(async (req, res) => {

    const submission = await submissionService.getSubmissionById(
        req.params.submissionId,
        req.user
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            submission,
            "Submission fetched successfully"
        )
    );

});


export {
    runCode,
    createSubmission,
    getMySubmissions,
    getAllSubmissions,
    getSubmissionById
};
