import express from "express";
import { login, logout } from "../controllers/authController.js";
import { validateLogin as validateUser } from "../middlewares/validateMiddleware.js";
import { recoveryPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", validateUser, login);
router.get("/logout", logout);
router.post("/recovery-password", recoveryPassword);

export default router;
