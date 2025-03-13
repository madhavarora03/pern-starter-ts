import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import { CORS_ORIGIN } from "./config";

const app = express();

// Log all requests to the console
const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Parse incoming requests with JSON payloads
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// enable cors
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

// cookie parser
app.use(cookieParser());

// router
import router from "./routes";
app.use("/api/v1", router);

export default app;
