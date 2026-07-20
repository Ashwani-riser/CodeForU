import crypto from "crypto";

export const generateVerificationToken = () => {
    const token = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    return {
        token,
        hashedToken,
        expiresAt: Date.now() + 15 * 60 * 1000 // 15 minutes
    };
};