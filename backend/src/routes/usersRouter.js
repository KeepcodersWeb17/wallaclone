import express from "express";
import { createUser, getUser } from "../controllers/userController.js";
import { validateUser } from "../middlewares/validateMiddleware.js";
import { isAuthenticated, isUserOwner } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", validateUser, createUser);
router.get("/:id", isAuthenticated, isUserOwner, getUser);
router.put("/:id", isAuthenticated, isUserOwner, validateUser, updateUser);
router.delete("/", isAuthenticated, deleteUser);

export default router;
