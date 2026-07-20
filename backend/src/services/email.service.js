import { transporter } from "../config/nodemailer.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { verifyEmailTemplate } from "../templates/verifyEmail.template.js";
import { resetPasswordTemplate } from "../templates/resetPassword.template.js";

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            html,
        });

        console.log("✅ Email Sent:", info.messageId);

        return info;
    } catch (error) {
        console.error("❌ Email Error:", error.message);
        throw error;
    }
};

export const sendVerificationEmail = async (user) => {

    const {
        token,
        hashedToken,
        expiresAt
    } = generateVerificationToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationTokenExpiry = expiresAt;

    await user.save({
        validateBeforeSave: false,
    });

    const verificationUrl =
        `${process.env.CLIENT_URL}/verify-email/${token}`;

    const html = verifyEmailTemplate(
        user.username,
        verificationUrl
    );

    await sendEmail({
        to: user.email,
        subject: "Verify Your Email",
        html,
    });
};

export const sendPasswordResetEmail = async ({
    email,
    fullName,
    token,
}) => {
    const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const html = resetPasswordTemplate(
        fullName,
        resetPasswordUrl,
        process.env.PASSWORD_RESET_TOKEN_EXPIRY
    );

    await sendEmail({
        to: email,
        subject: "Reset Your Password",
        html,
    });
};