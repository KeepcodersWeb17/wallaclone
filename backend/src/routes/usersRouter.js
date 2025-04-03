import express from "express";
import { createUser } from "../controllers/userController.js";
import { validateUser } from "../middlewares/validateMiddleware.js";

const router = express.Router();

router.post("/", validateUser, createUser);
router.get("/:id", isAuthenticated, getUser);

export default router;
