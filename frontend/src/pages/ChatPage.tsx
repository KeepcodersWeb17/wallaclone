import { useEffect, useState } from "react";
import socket from "../store/services/socket";
import { getUser } from "../store/selectors/selectors";
import { useAppSelector } from "../store/store";
import { useParams } from "react-router-dom";

type Message = {
  id: string;
  content: string;
  sender: string;
  createdAt: string;
};

const ChatPage = () => {
  const messagesInitData = [
    {
      id: "1",
      content: "Hello!",
      sender: "User2",
      createdAt: "2023-10-01T12:00:00Z"
    },
    {
      id: "2",
      content: "Hi! How are you?",
      sender: "User1",
      createdAt: "2023-10-01T12:05:00Z"
    }
  ] as Message[];

  const { chatId } = useParams();
  const user = useAppSelector(getUser);
  const [messages, setMessages] = useState<Message[]>(messagesInitData);

  useEffect(() => {
    socket.emit("joinChat", { chatId });

    socket.once("joinChat", (response) => {
      if (response.error) {
        socket.emit("rejoinChat", { chatId });
        return;
      }
    });

    socket.on("rejoinChat", (response) => {
      if (response.chatId) {
        console.log(response.message);
        // console.log("chat: ", response.chat);
      }
    });

    socket.on("message", (response) => {
      console.log(response.chat.messages);
      setMessages(response.chat.messages);
    });
  }, [chatId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content =
      event.currentTarget.querySelector<HTMLInputElement>("#content")?.value;

    socket.emit("message", {
      chatId,
      content,
      sender: user?.id
    });
    event.currentTarget.reset();
  };

  return (
    <>
      <h2 className="text-center">Chat</h2>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>
              <strong>{message.sender} said:</strong> {message.content}{" "}
              <span>{message.createdAt}</span>
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          id="content"
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default ChatPage;
