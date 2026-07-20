import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";
import testcaseRouter from "./routes/testcase.routes.js";
import submissionRouter from "./routes/submission.routes.js";
import contestRouter from "./routes/contest.route.js";
import profileRouter from "./routes/profile.routes.js";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";
import helmetMiddleware from "./middlewares/helmet.middleware.js";

import morganMiddleware from "./middlewares/morgan.middleware.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

const app = express();
app.disable("x-powered-by");//response ma "Express, ye header mat bhejna."

app.use(helmetMiddleware);
// app.use((req, res, next) => {
//     console.log("🔥 Middleware Hit");
//     next();
// });

app.use(morganMiddleware);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/api", apiLimiter);

app.use("/api/v1/users", authRouter);
app.use("/api/v1/users", profileRouter);
app.use("/api/v1/problems", problemRouter);
app.use("/api/v1/testcases", testcaseRouter);
app.use("/api/v1/submissions", submissionRouter);
app.use("/api/v1/contests",contestRouter);


app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        ...(process.env.NODE_ENV === "development" && {
            stack: err.stack,
        }),
    });
});



export { app };