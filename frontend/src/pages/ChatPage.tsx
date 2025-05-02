import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../store/services/sockets";
import { useAppSelector } from "../store/store";
import { getUser } from "../store/selectors/selectors";
import { Message } from "../store/state/types";

const ChatPage = () => {
  const { chatId } = useParams();
  const user = useAppSelector(getUser);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit("joinChat", { chatId });

    socket.on("chatJoined", (response) => {
      if (response.error) {
        console.error("Error:", response.error);
        return;
      }
      setMessages(response.chat.messages);
    });

    socket.on("messageReceived", (response) => {
      if (response.error) {
        console.error("Error:", response.error);
        return;
      }
      setMessages(response.chat.messages);
    });

    socket.on("", (error) => {
      console.error("Error:", error);
    });
  }, [chatId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content =
      event.currentTarget.querySelector<HTMLInputElement>("#content")?.value;

    socket.emit("sendMessage", {
      chatId,
      content,
      sender: user?.id
    });

    event.currentTarget.reset();
  };

  return (
    <div className="sm:auto w-full rounded-lg border border-gray-400 sm:max-w-7/8">
      <h2 className="text-md border-b border-gray-400 text-center leading-10 font-bold sm:text-lg md:text-xl">
        Chat
      </h2>
      <div className="flex min-h-100 flex-col gap-2">
        {messages.map((message) => (
          <div key={message.createdAt}>
            <p key={message.id}>
              <strong>{message.sender} said:</strong> {message.content}{" "}
              <span>{message.createdAt}</span>
            </p>
          </div>
        ))}
      </div>
      <form
        className="flex h-10 flex-row border-t border-gray-400"
        onSubmit={handleSubmit}
      >
        <input
          className="flex h-10 w-full flex-grow rounded-bl-lg p-1.5 px-4 text-xs placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none sm:placeholder:text-base md:w-100"
          type="text"
          name="content"
          id="content"
          placeholder="Type a message..."
        />
        <button
          className="flex h-10 min-w-1/5 cursor-pointer items-center justify-center rounded-br-lg border-l border-gray-400 bg-black px-4 py-2.5 text-center text-xs font-medium text-white transition duration-150 active:scale-98 sm:text-base"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
