import { z } from "zod";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const envSchema = z.object({
  NODE_ENV: z.string({ required_error: "NODE_ENV is required!" }).min(1),
  PORT: z.string({ required_error: "PORT is required!" }).min(1),
  ADDRESS: z.string().default("0.0.0.0"),
  CORS_ORIGIN: z.string({ required_error: "CORS_ORIGIN is required!" }).min(1),
});

const env = envSchema.parse(process.env);

export const { NODE_ENV, PORT, ADDRESS, CORS_ORIGIN } = env;
