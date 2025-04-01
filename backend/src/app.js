import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.json({ test: "Servidor funcionando" });
});

// 404 error handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
});

export default app;
