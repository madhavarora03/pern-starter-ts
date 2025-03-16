import { z } from "zod";

const usernameFieldValidation = z
  .string({ required_error: "Username is required!" })
  .min(3, "Username must be atleast 3 characters!")
  .max(16, "Username cannot be more than 16 characters!")
  .regex(
    /^[a-zA-Z][a-zA-Z0-9-]{2,15}$/,
    "Username must start with a letter and contain only letters, numbers, or hyphens."
  );

export const usernameValidationSchema = z.object({
  username: usernameFieldValidation,
});

export const userRegisterSchema = z.object({
  email: z.string({ required_error: "Email is required!" }),
  name: z.string({ required_error: "Name is required!" }),
  username: usernameFieldValidation,
  password: z.string({ required_error: "Password is required!" }),
});

export const userVerificationSchema = z.object({
  verificationCode: z.number({
    required_error: "Verification code is required!",
  }),
});

export const userLoginSchema = z.object({
  identifier: z.string({ required_error: "Identifier is required!" }),
  password: z.string({ required_error: "Password is required!" }),
});
