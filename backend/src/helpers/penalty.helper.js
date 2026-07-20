// src/helpers/penalty.helper.js

const calculatePenalty = (submissions, contestStartTime) => {
    // Group submissions by problem
    const problemMap = new Map();

    for (const submission of submissions) {
        const problemId = submission.problemId.toString();

        if (!problemMap.has(problemId)) {
            problemMap.set(problemId, []);
        }

        problemMap.get(problemId).push(submission);
    }

    let solved = 0;
    let penalty = 0;
    let lastAcTime = 0;

    const results = [];

    for (const [problemId, attempts] of problemMap.entries()) {

        let wrongAttempts = 0;
        let accepted = false;
        let solveTime = null;

        // Attempts are already sorted by createdAt
        for (const submission of attempts) {

            if (submission.verdict === "Accepted") {

                accepted = true;

                solveTime = Math.floor(
                    (new Date(submission.createdAt) - new Date(contestStartTime)) / 60000
                );

                solved++;

                penalty += solveTime + (wrongAttempts * 20);

                lastAcTime = Math.max(lastAcTime, solveTime);

                results.push({
                    problemId,
                    status: "AC",
                    wrongAttempts,
                    solveTime
                });

                break;
            }

            wrongAttempts++;
        }

        // Never solved
        if (!accepted) {
            results.push({
                problemId,
                status: "UNSOLVED",
                wrongAttempts,
                solveTime: null
            });
        }
    }

    return {
        solved,
        penalty,
        lastAcTime,
        results
    };
};

export default calculatePenalty;