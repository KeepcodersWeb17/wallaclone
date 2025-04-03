import express from "express";
import { createUser } from "../controllers/userController.js";
import { validateUser } from "../middlewares/validateMiddleware.js";

const router = express.Router();

router.post("/", validateUser, createUser);

export default router;
