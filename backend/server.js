import http from "node:http";
import app from "./src/app.js";
import { Server } from "socket.io";
import Chat from "./src/models/Chat.js";
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

io.on("connection", (socket) => {
  console.log("SocketID: ", socket.id);

  // create a room if it doesn't exist
  socket.on("createChat", async ({ advertId, userId, ownerId }) => {
    try {
      if (!advertId || !userId || !ownerId) {
        throw new Error("Missing required parameters");
      }

      const foundChat = await Chat.findOne({
        advert: advertId,
        members: { $all: [userId, ownerId] },
      }).populate("members", "username");

      if (foundChat) {
        socket.join(foundChat._id.toString());

        socket.emit("chatCreated", {
          chatId: foundChat._id.toString(),
        });

        return;
      }

      const newChat = await Chat.create({
        advert: advertId,
        members: [userId, ownerId],
      });

      socket.join(newChat._id.toString());

      socket.emit("chatCreated", {
        chatId: newChat._id.toString(),
      });
    } catch (error) {
      socket.emit("chatCreated", error.message);
    }
  });

  socket.on("joinChat", async ({ chatId }) => {
    try {
      if (!chatId) {
        throw new Error("Missing required parameters");
      }

      const foundChat = await Chat.findById(chatId);

      if (!foundChat) {
        throw new Error("Chat not found");
      }

      socket.join(foundChat._id.toString());

      socket.emit("chatJoined", {
        chat: foundChat,
      });
    } catch (error) {
      socket.emit("chatJoined", {
        error: error.message,
      });
    }
  });

  socket.on("sendMessage", async ({ chatId, content, sender }) => {
    try {
      if (!chatId || !content || !sender) {
        throw new Error("Missing required parameters");
      }

      const foundChat = await Chat.findById(chatId);

      if (!foundChat) {
        throw new Error("Chat not found");
      }

      const message = {
        content,
        sender,
      };

      foundChat.messages.push(message);

      console.log("Message sent:", message);

      await foundChat.save();

      io.to(chatId).emit("messageReceived", {
        chat: foundChat,
      });
    } catch (error) {
      socket.emit("messageReceived", {
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
