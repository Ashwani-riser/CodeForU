import { Submission } from "../models/submission.model.js";
import { Problem } from "../models/problem.model.js";
import { TestCase } from "../models/testcase.model.js";

import { runC } from "./runC.js";
import { runCpp } from "./runCpp.js";
import { runJava } from "./runJava.js";
import { runPython } from "./runPython.js";

import { compareOutput } from "./compareOutput.js";

export const judgeSubmission = async (submissionId) => {
    const submission = await Submission.findById(submissionId);

    if (!submission) {
        throw new Error("Submission not found");
    }

    const problem = await Problem.findById(submission.problemId);

    if (!problem) {
        throw new Error("Problem not found");
    }

    const testCases = await TestCase.find({
        problemId: problem._id,
        isHidden: true,
    });

    if (testCases.length === 0) {
        throw new Error("No hidden test cases found");
    }

    const runners = {
        c: runC,
        cpp: runCpp,
        java: runJava,
        python: runPython,
    };

    const runner = runners[submission.language];

    if (!runner) {
        throw new Error("Unsupported programming language");
    }

    let verdict = "Accepted";
    let maxExecutionTime = 0;

    for (const testCase of testCases) {
        const result = await runner(
            submission.sourceCode,
            testCase.input
        );

        maxExecutionTime = Math.max(
            maxExecutionTime,
            result.executionTime || 0
        );

        // Compilation Error / Runtime Error / TLE
        if (!result.success) {
            verdict = result.type;

            submission.compileError =
                result.type === "Compilation Error"
                    ? result.error
                    : null;

            break;
        }

        // Wrong Answer
        const isCorrect = compareOutput(
            result.output,
            testCase.expectedOutput
        );

        if (!isCorrect) {
            verdict = "Wrong Answer";
            submission.compileError = null;
            break;
        }
    }

    if (verdict === "Accepted") {
        submission.compileError = null;
    }

    submission.verdict = verdict;
    submission.executionTime = maxExecutionTime;

    await submission.save();

    return submission;
};