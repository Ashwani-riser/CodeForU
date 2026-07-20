import fs from "fs";
import path from "path";
import crypto from "crypto";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

const JAVA_CMD = process.env.JAVA_CMD || "java";
const JAVAC_CMD = process.env.JAVAC_CMD || "javac";

export const runJava = async (sourceCode, input) => {

    const jobId = crypto.randomUUID();

    const tempDir = path.join(process.cwd(), "temp", jobId);

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const codePath = path.join(tempDir, "Main.java");
    const inputPath = path.join(tempDir, "input.txt");

    fs.writeFileSync(codePath, sourceCode);
    fs.writeFileSync(inputPath, input);

    const cleanup = () => {
        try {
            if (fs.existsSync(tempDir)) {
                fs.rmSync(tempDir, {
                    recursive: true,
                    force: true,
                });
            }
        } catch (err) {
            console.error("Cleanup Error:", err.message);
        }
    };

    // Compile Phase
    try {

        await execAsync(
            `${JAVAC_CMD} "${codePath}"`
        );

    } catch (error) {

        const compileError = (error.stderr || error.message)
            .replace(
                new RegExp(codePath.replace(/\\/g, "\\\\"), "g"),
                "Main.java"
            )
            .trim();

        cleanup();

        return {
            success: false,
            type: "Compilation Error",
            executionTime: 0,
            error: compileError,
        };
    }

    // Start timer after compilation
    const startTime = Date.now();

    try {

        const { stdout } = await execAsync(
            `cmd /c "cd /d "${tempDir}" && ${JAVA_CMD} Main < input.txt"`,
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

        cleanup();

        if (
            error.killed ||
            error.signal === "SIGTERM" ||
            error.code === "ETIMEDOUT"
        ) {
            return {
                success: false,
                type: "Time Limit Exceeded",
                executionTime,
            };
        }

        return {
            success: false,
            type: "Runtime Error",
            executionTime,
            error: (error.stderr || error.message).trim(),
        };
    }
};