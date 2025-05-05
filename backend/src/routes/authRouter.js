import express from "express";
import { login, logout } from "../controllers/authController.js";
import {
  validateUpdateUser,
  validateLogin as validateUser,
} from "../middlewares/validateMiddleware.js";
import { recoveryPassword } from "../controllers/authController.js";
import { updateUser } from "../controllers/userController.js";
import { validatePassToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", validateUser, login);
router.get("/logout", logout);
router.post("/recovery-password", recoveryPassword);
router.put(
  "/reset-password/:token",
  validatePassToken,
  validateUpdateUser,
  updateUser
);

export default router;
