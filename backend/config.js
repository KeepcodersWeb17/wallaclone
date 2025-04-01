import dotenv from "dotenv/config";

export const { PORT } = process.env;

if (!PORT) {
  throw new Error("Environment variable PORT is not defined");
}
