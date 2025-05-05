import http from "node:http";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import app from "./src/app.js";
import Chat from "./src/models/Chat.js";
import { connectMongoDB } from "./src/lib/connectMongoDB.js";
import User from "./src/models/User.js";

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
  const raw = socket.handshake.headers.cookie;

  if (!raw) {
    return next(new Error("No tienes la cookie necesaria"));
  }

  const { accessToken } = cookie.parse(raw);

  if (!accessToken) {
    return next(new Error("accessToken no encontrado"));
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error("Invalid token");
      error.status = 403;
      next(error);
      return;
    }
  });
  next();
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
      });

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

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { chats: newChat._id },
        },
        { new: true }
      );

      const updatedOwner = await User.findByIdAndUpdate(
        ownerId,
        {
          $addToSet: { chats: newChat._id },
        },
        { new: true }
      );

      socket.join(newChat._id.toString());

      socket.emit("chatCreated", {
        chatId: newChat._id.toString(),
      });
    } catch (error) {
      socket.emit("chatCreated", error.message);
    }
  });

  // join a chat room when the user navigates to the chat page
  // only if the user is a member of the chat
  socket.on("joinChat", async ({ chatId, userId }) => {
    try {
      if (!chatId) {
        throw new Error("Missing required parameters");
      }

      const foundChat = await Chat.findById(chatId)
        .populate("advert")
        .populate("members")
        .populate("messages.sender", "username");

      if (!foundChat) {
        throw new Error("Chat not found");
      }

      const isMember = foundChat.members.some(
        (memberId) => memberId._id.toString() === userId
      );

      if (!isMember) {
        throw new Error("Unauthorized access to this chat");
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

  // receive a message and emit it to the chat room
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

      await foundChat.save();

      const updatedChat = await Chat.findById(chatId)
        .populate("advert")
        .populate("members", "username")
        .populate("messages.sender", "username");

      io.to(chatId).emit("messageReceived", {
        chat: updatedChat,
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
