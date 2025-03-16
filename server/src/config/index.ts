import { z } from "zod";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const envSchema = z.object({
  NODE_ENV: z.string({ required_error: "NODE_ENV is required!" }).min(1),
  PORT: z.string({ required_error: "PORT is required!" }).min(1),
  ADDRESS: z.string().default("0.0.0.0"),
  CORS_ORIGIN: z.string({ required_error: "CORS_ORIGIN is required!" }).min(1),
  NODEMAILER_HOST: z.string({ required_error: "NODEMAILER_HOST is required!" }),
  NODEMAILER_PORT: z.string({ required_error: "NODEMAILER_PORT is required!" }),
  NODEMAILER_USER_ID: z
    .string({ required_error: "NODEMAILER_USER_ID is required!" })
    .min(1),
  NODEMAILER_PASSWORD: z
    .string({ required_error: "NODEMAILER_PASSWORD is required!" })
    .min(1),
  ACCESS_TOKEN_SECRET: z
    .string({
      required_error: "ACCESS_TOKEN_SECRET is required!",
    })
    .min(1),
  ACCESS_TOKEN_EXPIRY: z
    .string({
      required_error: "ACCESS_TOKEN_EXPIRY is required!",
    })
    .min(1),
  REFRESH_TOKEN_SECRET: z
    .string({ required_error: "REFRESH_TOKEN_SECRET is required!" })
    .min(1),
  REFRESH_TOKEN_EXPIRY: z
    .string({ required_error: "REFRESH_TOKEN_EXPIRY is required!" })
    .min(1),
});

const env = envSchema.parse(process.env);

export const {
  NODE_ENV,
  PORT,
  ADDRESS,
  CORS_ORIGIN,
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_USER_ID,
  NODEMAILER_PASSWORD,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
} = env;
