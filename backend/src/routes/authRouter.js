import express from "express";
import { login, logout } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { validateLogin as validateUser } from "../middlewares/validateMiddleware.js";

const router = express.Router();

router.post("/login", validateUser, login);
router.get("/logout", isAuthenticated, logout);

export default router;
