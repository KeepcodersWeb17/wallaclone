import z from "zod";
import { userSchema, loginSchema } from "../validations/userSchema.js";

export const validateUser = (req, res, next) => {
  try {
    const validatedUser = userSchema.parse(req.body);
    req.body = validatedUser;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }
  }
};

export const validateLogin = (req, res, next) => {
  try {
    const validateLogin = loginSchema.parse(req.body);
    req.body = validateLogin;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }
  }
};
