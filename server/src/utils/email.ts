import {
  NODEMAILER_HOST,
  NODEMAILER_PASSWORD,
  NODEMAILER_PORT,
  NODEMAILER_USER_ID,
} from "@/config";
import nodemailer from "nodemailer";
import logger from "./logger";
import {
  verificationEmailTemplate,
  welcomeEmailTemplate,
} from "./emailTemplates";

const transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: Number(NODEMAILER_PORT),
  auth: {
    user: NODEMAILER_USER_ID,
    pass: NODEMAILER_PASSWORD,
  },
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  verificationCode: number
) {
  try {
    const info = await transporter.sendMail({
      from: "example@domain.com",
      to: email,
      subject: "Verify Account | Example App",
      html: verificationEmailTemplate
        .replace("{username}", username)
        .replace("{verificationCode}", verificationCode.toString()),
    });

    logger.info(`Email sent successfully: ${info.response}`);
    return {
      success: true,
      message: "Email successfully queued for delivery.",
    };
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error sending email:", error);
      return {
        success: false,
        message: error.message,
      };
    } else {
      logger.error("An unknown error occurred while sending the email");
      return {
        success: false,
        message: "An unknown error occurred.",
      };
    }
  }
}

export async function sendWelcomeEmail(email: string, username: string) {
  try {
    const info = await transporter.sendMail({
      from: "example@domain.com",
      to: email,
      subject: "Welcome to Example App",
      html: welcomeEmailTemplate.replace("{username}", username),
    });

    logger.info(`Email sent successfully: ${info.response}`);
    return {
      success: true,
      message: "Email successfully queued for delivery.",
    };
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error sending email:", error);
      return {
        success: false,
        message: error.message,
      };
    } else {
      logger.error("An unknown error occurred while sending the email");
      return {
        success: false,
        message: "An unknown error occurred.",
      };
    }
  }
}
