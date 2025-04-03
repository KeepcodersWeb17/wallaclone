import express from "express";
import { validateLogin as validateUser } from "../middlewares/validateUser.js";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", validateUser, login);

export default router;
