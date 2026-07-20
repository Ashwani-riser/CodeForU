export const verifyEmailTemplate = (username, verificationUrl) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Verify Your Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:40px;">

        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px;">

            <h2 style="color:#2563eb;">
                Welcome to Online Judge 🚀
            </h2>

            <p>
                Hi <strong>${username}</strong>,
            </p>

            <p>
                Thanks for registering.
                Please verify your email address by clicking the button below.
            </p>

            <div style="text-align:center; margin:35px 0;">
                <a
                    href="${verificationUrl}"
                    style="
                        background:#2563eb;
                        color:white;
                        padding:14px 24px;
                        text-decoration:none;
                        border-radius:6px;
                        display:inline-block;
                    "
                >
                    Verify Email
                </a>
            </div>

            <p>
                This verification link will expire in <strong>15 minutes</strong>.
            </p>

            <p>
                If you didn't create an account, you can safely ignore this email.
            </p>

            <hr />

            <p style="font-size:13px; color:#666;">
                Online Judge Team
            </p>

        </div>

    </body>
    </html>
    `;
};