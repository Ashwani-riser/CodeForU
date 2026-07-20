import fs from "fs";
import path from "path";
import crypto from "crypto";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

export const runCpp = async (sourceCode, input) => {

    const jobId = crypto.randomUUID();

    const tempDir = "temp";

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    const codePath = path.join(tempDir, `${jobId}.cpp`);
    const inputPath = path.join(tempDir, `${jobId}.txt`);
    const exePath = path.join(tempDir, `${jobId}.exe`);

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

            if (fs.existsSync(exePath)) {
                fs.unlinkSync(exePath);
            }
        } catch (err) {
            console.error("Cleanup Error:", err.message);
        }
    };

    // Compile Phase
    try {

        await execAsync(
            `g++ "${codePath}" -o "${exePath}"`
        );

    } catch (error) {
        
         const compileError = (error.stderr || error.message)
            .replace(
                new RegExp(codePath.replace(/\\/g, "\\\\"), "g"),
                "main.cpp"
            )
            .split("\n")
            .filter(line => line.includes("error:"))
            .join("\n");

        cleanup();

        return {
            success: false,
            type: "Compilation Error",
            executionTime: 0,
            error: compileError
        };
    }
    // Start timer AFTER compilation
    const startTime = Date.now();

    // Run Phase
    try {

        const { stdout } = await execAsync(
            `cmd /c "${exePath} < ${inputPath}"`,
            {
                timeout: 2000
            }
        );

        const executionTime = Date.now() - startTime;

        cleanup();

        return {
            success: true,
            output: stdout.trim(),
            executionTime
        };

    } catch (error) {
        const executionTime = Date.now() - startTime;
        cleanup();

        if (
            error.killed ||
            error.signal === "SIGTERM"
        ) {
            return {
                success: false,
                type: "Time Limit Exceeded",
                executionTime
            };
        }

        return {
            success: false,
            type: "Runtime Error",
            executionTime,
            error:(error.stderr || error.message).trim()
        };
    }
};