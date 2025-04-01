import http from "node:http";
import app from "./app.js";
import { PORT } from "../config.js";

const port = PORT || 3000;

const server = http.createServer(app);

server.on("error", (error) => console.error(error));

server.on("listening", () =>
  console.log(`Server is running on http://localhost:${port}`)
);

server.listen(port);
