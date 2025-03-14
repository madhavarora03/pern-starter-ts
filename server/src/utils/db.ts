import { PrismaClient } from "@prisma/client";
import logger from "./logger";

const prisma = new PrismaClient();

export async function connect() {
  try {
    await prisma.$connect();
    logger.info("====================================");
    logger.info("====== Connected to Database! ======");
  } catch (error) {
    logger.error("Error connecting to database: ", error);
    process.exit(1);
  }
}

export default prisma;
