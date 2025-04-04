import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { validateUser } from "../middlewares/validateMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", validateUser, createUser);
router.get("/", isAuthenticated, getUser);
router.put("/", isAuthenticated, validateUser, updateUser);
router.delete("/", isAuthenticated, deleteUser);

export default router;
