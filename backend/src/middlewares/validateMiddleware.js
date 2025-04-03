import z from "zod";
import { userSchema, loginSchema } from "../validations/userSchema.js";
import {
  createAdvertZodSchema,
  updateAdvertZodSchema,
} from "../validations/advertSchema.js";

const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateUser = validate(userSchema);
export const validateLogin = validate(loginSchema);

export const validateCreateAdvert = validate(createAdvertZodSchema);
export const validateUpdateAdvert = validate(updateAdvertZodSchema);
