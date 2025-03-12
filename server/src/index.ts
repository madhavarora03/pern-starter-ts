import { createServer } from "http";
import app from "./app";
import { ADDRESS, NODE_ENV, PORT } from "./config";
import logger from "./utils/logger";

const server = createServer(app).listen(Number(PORT), ADDRESS, () => {
  logger.info("====================================");
  logger.info(`========= ENV: ${NODE_ENV} =========`);
  logger.info(` 🚀 App listening on the port: ${PORT}`);
  logger.info("====================================");
});

function exitHandler() {
  if (server) {
    server.close(() => {
      logger.info("Server closed...");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

function unexpectedErrorHandler(error: Error) {
  logger.error("Unexpected Error:");
  logger.error(error);
  exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
