import express from "express";
import { validateUser } from "../middlewares/validateUser.js";
import { createUser } from "../controllers/usersController.js";

const router = express.Router();

router.post("/users", validateUser, createUser);

export default router;
