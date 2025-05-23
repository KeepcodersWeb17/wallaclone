import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Chat } from "../store/state/types";
import socket from "../store/services/sockets";
import { useAppSelector } from "../store/store";
import { getUser } from "../store/selectors/selectors";

const ChatPage = () => {
  const { chatId } = useParams();

  const navigate = useNavigate();

  const user = useAppSelector(getUser);

  const [chat, setChat] = useState<Chat>();

  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat content when it updates
  useEffect(() => {
    const chatContentElement = containerRef.current;

    if (chatContentElement) {
      chatContentElement.scrollTop = chatContentElement.scrollHeight;
    }
  }, [chat]);

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
        return;
      }
      setChat(response.chat);
    });

    return () => {
      socket.off("chatJoined");
      socket.off("messageReceived");
    };
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
    <>
      <nav className="flex w-full flex-row items-center justify-between sm:max-w-7/8">
        <div>
          <button className="cursor-pointer py-2" onClick={() => navigate(-1)}>
            ← Go back
          </button>
        </div>
      </nav>
      <div className="w-full rounded-lg border border-gray-400 sm:max-w-7/8">
        <h2 className="flex items-center justify-between border-b border-gray-400 px-4 text-center leading-10 font-bold sm:text-lg md:text-xl">
          <Link to={`/adverts/${chat?.advert.name}-${chat?.advert._id}`}>
            {chat?.advert.name} {""}
          </Link>
          <span className="block text-xs font-normal text-gray-500">
            ref: {chat?.advert._id}
          </span>
        </h2>
        <div
          ref={containerRef}
          className="flex max-h-80 min-h-80 flex-col gap-2 overflow-y-scroll px-6 py-2"
        >
          {chat?.messages.map((message) => (
            <div key={message.createdAt}>
              <p
                key={message.id}
                className="text-xs font-normal text-gray-500 sm:text-base"
              >
                <strong className="capitalize">
                  {message.sender.username}:
                </strong>{" "}
                {message.content}{" "}
              </p>
            </div>
          ))}
        </div>
        <form
          className="flex flex-row border-t border-gray-400"
          onSubmit={handleSubmit}
        >
          <input
            className="flex w-full flex-grow rounded-bl-lg px-4 py-2.5 text-xs placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none sm:placeholder:text-base md:w-100"
            type="text"
            name="content"
            id="content"
            placeholder="Type a message..."
          />
          <button
            className="flex min-w-1/5 cursor-pointer items-center justify-center rounded-br-lg border-l border-gray-400 bg-black px-4 py-2 text-center text-xs font-medium text-white transition duration-150 active:scale-98 sm:text-base"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatPage;
