import { config } from "dotenv";

config()

export const port = process.env.PORT
export const base_url = process.env.BASE_URL || "localhost:5000";
export const apiVersion = process.env.API_VERSION