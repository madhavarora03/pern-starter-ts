import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import logger from "./logger";

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async $allOperations({ operation, args, query }) {
        // Check if the operation is "create" or "update" and if password is in args.data
        if (
          ["create", "update"].includes(operation) &&
          "data" in args &&
          args.data &&
          "password" in args.data &&
          typeof args.data.password === "string"
        ) {
          // Hash the password asynchronously using bcryptjs
          args.data.password = await bcrypt.hash(args.data.password, 10);
        }
        return query(args);
      },
    },
  },
});

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
