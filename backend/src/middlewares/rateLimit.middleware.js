import rateLimit from "express-rate-limit";

const options = {
    standardHeaders: true,
    legacyHeaders: false
};

export const apiLimiter = rateLimit({
    ...options,
    windowMs: 15 * 60 * 1000,
    max: 100
});

export const authLimiter = rateLimit({
    ...options,
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many authentication attempts. Try again later."
});

export const submissionLimiter = rateLimit({
    ...options,
    windowMs: 60 * 1000,
    max: 20,
    message: "Submission limit exceeded. Try again in a minute."
}); 