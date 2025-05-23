import express from "express";
import morgan from "morgan";
import cors from "cors";
import z from "zod";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter.js";
import usersRouter from "./routes/usersRouter.js";
import advertsRouter from "./routes/advertsRouter.js";
import tagsRouter from "./routes/tagsRouter.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.use(
  cors({
    origin: [
      "http://localhost:4173",
      "http://localhost:5173",
      "https://wallaclone.keepcoders.duckdns.org",
    ],
    credentials: true,
  })
);

app.get("/test", (req, res) => {
  res.json({ test: "Servidor funcionando" });
});

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/adverts", advertsRouter);
app.use("/tags", tagsRouter);

// 404 error handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  if (err instanceof z.ZodError) {
    res.status(400).json({
      error: err.errors.map((error) => ({
        field: error.path[0],
        message: error.message,
      })),
    });
    return;
  }
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
});

export default app;
