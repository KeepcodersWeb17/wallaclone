import express from "express";
import { vaidateLogin } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/login", vaidateLogin);

export default router;
