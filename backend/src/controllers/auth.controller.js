import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendVerificationEmail,sendPasswordResetEmail } from "../services/email.service.js";
import { generatePasswordResetToken } from "../utils/generatePasswordResetToken.js";

import crypto from "crypto";

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }
    const user = await User.create({
        username,
        email,
        password
    });
   const createdUser = await User.findById(user._id)
        .select("-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry");

    try {
    await sendVerificationEmail(user);
        } catch (error) {
     console.error(error);

     return res.status(201).json(
        new ApiResponse(
            201,
            {
                user: createdUser,
                isEmailVerified: false
            },
            "Registration successful, but verification email could not be sent. Please use resend verification."
        )
    );
}



    return res.status(201).json(
               new ApiResponse(
            201,
            {
                user: createdUser,
                isEmailVerified: false
            },
            "Registration successful. Please verify your email."
        )

    );
});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(
            400,
            "Email and Password are required"
        );
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(
            404,
            "User does not exist"
        );
    }

    const isPasswordValid =
        await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(
            401,
            "Invalid Credentials"
        );
    }
    if (!user.isEmailVerified) {
    throw new ApiError(
        403,
        "Please verify your email before logging in."
    );
}

    const accessToken =
        user.generateAccessToken();

    const refreshToken =
        user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
        validateBeforeSave: false
    });

    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken");
    
    const options = {
        httpOnly: true,
        secure: false // production me true
    };

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser
                },
                "User logged in successfully"
            )
        );
});
const verifyEmail = asyncHandler(async (req, res) => {

    const { token } = req.params;

    if (!token) {
        throw new ApiError(400, "Verification token is required");
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or expired verification token"
        );
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationTokenExpiry = null;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Email verified successfully"
        )
    );

});

const resendVerificationEmail = asyncHandler(async (req, res) => {

    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isEmailVerified) {
        throw new ApiError(400, "Email is already verified");
    }

    await sendVerificationEmail(user);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Verification email sent successfully."
        )
    );

});
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    // Find user (case-insensitive)
    const user = await User.findOne({
        email: email.toLowerCase(),
    });

    // Prevent Email Enumeration Attack
    if (!user) {
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "If an account exists with this email, a password reset link has been sent."
            )
        );
    }

    // Generate Password Reset Token
    const {
        unHashedToken,
        hashedToken,
        tokenExpiry,
    } = generatePasswordResetToken();

    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpiry = tokenExpiry;

    await user.save({
        validateBeforeSave: false,
    });

    try {
        // Send Password Reset Email
        await sendPasswordResetEmail({
            email: user.email,
            fullName: user.username,
            token: unHashedToken,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "If an account exists with this email, a password reset link has been sent."
            )
        );
    } catch (error) {
        console.error("Forgot Password Email Error:", error);

        // Rollback token if email sending fails
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiry = undefined;

        await user.save({
            validateBeforeSave: false,
        });

        throw new ApiError(
            500,
            "Failed to send password reset email. Please try again later."
        );
    }
});
const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;//jo request vejta hai plain text ma url ma token
    const { password } = req.body;

    if (!token) {
        throw new ApiError(400, "Reset token is required");
    }

    if (!password) {
        throw new ApiError(400, "New password is required");
    }

    // Hash incoming token
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // Find user with valid token
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetTokenExpiry: {
            $gt: Date.now(),
        },
    });

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or expired password reset token"
        );
    }

    // Update password
    user.password = password;

    // Clear reset token
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;

    // Logout from all devices
    user.refreshToken = undefined;

    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Password reset successful. Please login with your new password."
        )
    );
});
const getCurrentUser = asyncHandler(async (req, res) => {

    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "Current User Fetched"
        )
    );

});

export {
    registerUser,
    loginUser,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    getCurrentUser
};