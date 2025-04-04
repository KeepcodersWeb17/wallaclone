import http from "node:http";
import app from "./src/app.js";
import { connectMongoDB } from "./src/lib/connectMongoDB.js";

const port = process.env.PORT || 3333;

const server = http.createServer(app);

await connectMongoDB();

server.on("error", (error) => console.error(error));

server.on("listening", () =>
  console.log(`Server is running on http://localhost:${port}`)
);

server.listen(port);
