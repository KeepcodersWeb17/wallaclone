import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import socket from "../store/services/sockets";
import { useAppSelector } from "../store/store";
import { getUser } from "../store/selectors/selectors";
import { Chat } from "../store/state/types";

const ChatPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(getUser);

  const [chat, setChat] = useState<Chat>();

  useEffect(() => {
    socket.emit("joinChat", { chatId, userId: user?.id });

    socket.on("chatJoined", (response) => {
      if (response.chat) {
        setChat(response.chat);
        return;
      }

      if (response.error.includes("Unauthorized")) {
        navigate("/403");
        return;
      }
    });

    socket.on("messageReceived", (response) => {
      if (response.error) {
        console.error("Error:", response.error);
        return;
      }
      setChat(response.chat);
    });

    socket.on("", (error) => {
      console.error("Error:", error);
    });
  }, [chatId, navigate, user?.id]);

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
      <h2 className="text-md flex items-center justify-between border-b border-gray-400 px-4 text-center leading-10 font-bold sm:text-lg md:text-xl">
        <Link to={`/adverts/${chat?.advert.name}-${chat?.advert._id}`}>
          {chat?.advert.name} {""}
        </Link>
        <span className="block text-xs font-normal text-gray-500">
          ref: {chat?.advert._id}
        </span>
      </h2>
      <div className="flex max-h-24 min-h-100 flex-col gap-2 overflow-y-scroll px-6 py-2">
        {chat?.messages.map((message) => (
          <div key={message.createdAt}>
            <p
              key={message.id}
              className="text-xs font-normal text-gray-500 sm:text-base"
            >
              <strong className="capitalize">{message.sender.username}:</strong>{" "}
              {message.content}{" "}
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
