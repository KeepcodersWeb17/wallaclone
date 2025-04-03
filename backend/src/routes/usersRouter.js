import express from "express";
import { validateUser } from "../middlewares/validateUser.js";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", validateUser, createUser);

export default router;
