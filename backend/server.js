import http from "node:http";
import { Server } from "socket.io";
import { parse } from "cookie";
import app from "./src/app.js";
import { connectMongoDB } from "./src/lib/connectMongoDB.js";
import Chat from "./src/models/Chat.js";

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

  socket.on("joinChat", async ({ advertId, ownerId, userId }) => {
    let newChatId;
    try {
      if (!advertId || !ownerId || !userId) {
        throw new Error("Missing required parameters");
      }

      const foundChat = await Chat.findOne({
        advert: advertId,
        members: { $all: [ownerId, userId] },
      });

      if (foundChat) {
        socket.join(foundChat._id.toString());

        socket.emit("joinChat", {
          message: "Joined",
          chatId: foundChat._id.toString(),
        });
        return;
      }

      const newChat = new Chat({
        advert: advertId,
        members: [ownerId, userId],
      });

      newChatId = await newChat.save().select("_id");

      await User.findByIdAndUpdate(userId, {
        $addToSet: { chats: newChatId },
      });

      await User.findByIdAndUpdate(ownerId, {
        $addToSet: { chats: newChatId },
      });

      socket.join(newChat._id.toString());

      socket.emit("joinChat", {
        message: "Joined",
        chatId: newChat._id.toString(),
      });
    } catch (error) {
      await Chat.deleteOne({ _id: newChatId });
      socket.emit("joinChat", {
        error: error.message,
      });
    }
  });

  socket.on("rejoinChat", async ({ chatId }) => {
    try {
      console.log("Rejoining chat:", chatId);

      if (!chatId) {
        throw new Error("Missing required parameters");
      }

      const foundChat = await Chat.findById(chatId);

      if (!foundChat) {
        throw new Error("Chat not found");
      }

      socket.join(foundChat._id.toString());

      socket.emit("rejoinChat", {
        message: "Rejoined",
        chatId: foundChat._id.toString(),
        chat: foundChat,
      });
    } catch (error) {
      socket.emit("rejoinChat", {
        error: error.message,
      });
    }
  });

  socket.on("message", async ({ chatId, content, sender }) => {
    try {
      if (!chatId || !content || !sender) {
        throw new Error("Missing required parameters");
      }

      const chat = await Chat.findById(chatId);

      if (!chat) {
        throw new Error("Chat not found");
      }

      const message = {
        sender,
        content,
      };

      chat.messages.push(message);

      console.log("Chat messages:", chat.messages);

      await chat.save();

      io.to(chatId).emit("message", {
        message: "Message saved",
        chat: chat,
      });
    } catch (error) {
      socket.emit("message", {
        error: error.message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    console.log(socket.rooms);
  });
});

await connectMongoDB();

server.on("error", (error) => console.error(error));

server.on("listening", () =>
  console.log(`Server is running on http://localhost:${port}`)
);

server.listen(port);
