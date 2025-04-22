import http from "node:http";
import { Server } from "socket.io";
import { parse } from "cookie";
import app from "./src/app.js";
import { connectMongoDB } from "./src/lib/connectMongoDB.js";

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:4173",
      "http://localhost:5173",
      "https://wallaclone.keepcoders.duckdns.org",
    ],
    credentials: true,
  },
});

io.use((socket, next) => {
  // obtenemos la cookies de la peticion
  const rawCookie = socket.handshake.headers.cookie;

  // parseamos la cookie
  const cookie = parse(rawCookie || "");

  // obtenemos el accessToken
  const accessToken = cookie.accessToken || cookie["accessToken"];

  // guardamos el accessToken en el socket
  socket.handshake.auth = { accessToken };

  next();
});

io.on("connection", (socket) => {
  console.log("SocketID:", socket.id);
  console.log(socket);
});

await connectMongoDB();

server.on("error", (error) => console.error(error));

server.on("listening", () =>
  console.log(`Server is running on http://localhost:${port}`)
);

server.listen(port);
