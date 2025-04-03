import express from "express";
import { validateLogin } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/login", validateLogin);

export default router;
