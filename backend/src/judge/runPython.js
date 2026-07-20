import fs from "fs";
import path from "path";
import crypto from "crypto";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

const PYTHON_CMD = process.env.PYTHON_CMD || "python3";

export const runPython = async (sourceCode, input) => {
    const jobId = crypto.randomUUID();

    const tempDir = path.join(process.cwd(), "temp");

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const codePath = path.join(tempDir, `${jobId}.py`);
    const inputPath = path.join(tempDir, `${jobId}.txt`);

    fs.writeFileSync(codePath, sourceCode);
    fs.writeFileSync(inputPath, input);

    const cleanup = () => {
        try {
            if (fs.existsSync(codePath)) {
                fs.unlinkSync(codePath);
            }

            if (fs.existsSync(inputPath)) {
                fs.unlinkSync(inputPath);
            }
        } catch (err) {
            console.error("Cleanup Error:", err.message);
        }
    };

    // Start timer
    const startTime = Date.now();

    try {
        const { stdout } = await execAsync(
            `${PYTHON_CMD} "${codePath}" < "${inputPath}"`,
            {
                timeout: 2000,
            }
        );

        const executionTime = Date.now() - startTime;

        cleanup();

        return {
            success: true,
            output: stdout.trim(),
            executionTime,
        };
    } catch (error) {
        const executionTime = Date.now() - startTime;

        const errorMessage = (error.stderr || error.message)
            .replace(
                new RegExp(codePath.replace(/\\/g, "\\\\"), "g"),
                "main.py"
            )
            .trim();

        cleanup();

        if (error.killed || error.signal === "SIGTERM") {
            return {
                success: false,
                type: "Time Limit Exceeded",
                executionTime,
            };
        }

        // Python syntax-related errors are treated as compilation errors
        if (
            errorMessage.includes("SyntaxError") ||
            errorMessage.includes("IndentationError") ||
            errorMessage.includes("TabError")
        ) {
            return {
                success: false,
                type: "Compilation Error",
                executionTime: 0,
                error: errorMessage,
            };
        }

        return {
            success: false,
            type: "Runtime Error",
            executionTime,
            error: errorMessage,
        };
    }
};