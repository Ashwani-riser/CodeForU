import morgan from "morgan";

const morganMiddleware =
    process.env.NODE_ENV === "production"
        ? morgan("combined")
        : morgan("dev");

export default morganMiddleware;