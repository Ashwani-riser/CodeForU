export const getContestStatus = (contest) => {

    const now = new Date();

    if (now < contest.startTime) {
        return "UPCOMING";
    }

    if (now > contest.endTime) {
        return "ENDED";
    }

    return "RUNNING";
};