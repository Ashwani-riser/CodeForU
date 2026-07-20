export const resetPasswordTemplate = (
    fullName,
    resetPasswordUrl,
    expiryMinutes
) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Reset Your Password</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding:40px 20px;">

                    <table width="600" cellpadding="0" cellspacing="0"
                        style="background:#ffffff;border-radius:10px;overflow:hidden;">

                        <tr>
                            <td style="background:#2563eb;padding:20px;text-align:center;">
                                <h1 style="color:#ffffff;margin:0;">
                                    Online Judge
                                </h1>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:40px;">

                                <h2 style="margin-top:0;">
                                    Reset Your Password
                                </h2>

                                <p>
                                    Hello <strong>${fullName}</strong>,
                                </p>

                                <p>
                                    We received a request to reset the password
                                    for your Online Judge account.
                                </p>

                                <p>
                                    Click the button below to create a new password.
                                </p>

                                <div style="text-align:center;margin:35px 0;">
                                    <a
                                        href="${resetPasswordUrl}"
                                        style="
                                            background:#2563eb;
                                            color:#ffffff;
                                            text-decoration:none;
                                            padding:14px 28px;
                                            border-radius:6px;
                                            display:inline-block;
                                            font-weight:bold;
                                        "
                                    >
                                        Reset Password
                                    </a>
                                </div>

                                <p>
                                    If the button doesn't work, copy and paste
                                    the following link into your browser:
                                </p>

                                <p style="word-break:break-all;">
                                    ${resetPasswordUrl}
                                </p>

                                <p>
                                    This link will expire in
                                    <strong>${expiryMinutes} minutes</strong>.
                                </p>

                                <p>
                                    If you didn't request a password reset,
                                    you can safely ignore this email.
                                </p>

                                <p>
                                    Thanks,<br/>
                                    <strong>Online Judge Team</strong>
                                </p>

                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    `;
};