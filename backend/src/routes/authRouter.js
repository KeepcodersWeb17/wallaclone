import express from "express";
import { login } from "../controllers/authController.js";
import { validateLogin as validateUser } from "../middlewares/validateMiddleware.js";

const router = express.Router();

router.post("/login", validateUser, login);

export default router;
