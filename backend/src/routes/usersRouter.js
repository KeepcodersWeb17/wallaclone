import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  validateUpdateUser,
  validateUser,
} from "../middlewares/validateMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { deleteOwnerAdverts } from "../controllers/advertController.js";

const router = express.Router();

router.post("/", validateUser, createUser);
router.get("/", isAuthenticated, getUser);
router.put("/", isAuthenticated, validateUpdateUser, updateUser);
router.delete("/", isAuthenticated, deleteOwnerAdverts, deleteUser, logout);

export default router;
