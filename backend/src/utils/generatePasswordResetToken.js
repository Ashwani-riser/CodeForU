import crypto from "crypto";

export const generatePasswordResetToken = () => {
    const unHashedToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");

    const tokenExpiry = new Date(
        Date.now() +
            Number(process.env.PASSWORD_RESET_TOKEN_EXPIRY) * 60 * 1000
    );

    return {
        unHashedToken,
        hashedToken,
        tokenExpiry,
    };
};