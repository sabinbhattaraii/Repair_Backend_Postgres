import { config } from "dotenv";

config()

export const port = process.env.PORT
export const base_url = process.env.BASE_URL || "localhost:5000";
export const apiVersion = process.env.API_VERSION

// config to nodemailer to send email
export const fromEmail = process.env.FROM_EMAIL;
export const fromPassword = process.env.FROM_PASSWORD;
export const emailHost = process.env.EMAIL_HOST;
export const emailPort = process.env.EMAIL_PORT;
export const emailSecure = process.env.EMAIL_SECURE;