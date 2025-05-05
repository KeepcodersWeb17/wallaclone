import { Link } from "react-router-dom";
import { Chat } from "../store/state/types";
import { useAppSelector } from "../store/store";
import { getUser } from "../store/selectors/selectors";

const ChatsPage = () => {
  const user = useAppSelector(getUser);
  const chats = user?.chats as Chat[];

  return (
    <div className="flex min-h-80 w-full flex-col rounded-lg border border-gray-400 sm:max-w-7/8">
      <h2 className="flex items-center justify-between border-b border-gray-400 px-4 text-center leading-10 font-bold sm:text-lg md:text-xl">
        Chats
      </h2>
      {chats.length === 0 ? (
        <div className="flex flex-grow items-center justify-center px-6 py-2">
          <p>You don't have any chats yet.</p>
        </div>
      ) : (
        <div className="flex flex-grow justify-center overflow-y-scroll p-6">
          <ul className="flex w-full flex-col gap-4">
            {chats.map((chat) => (
              <li className="" key={chat._id}>
                <Link
                  className="flex w-full flex-row items-center justify-between gap-2 rounded-lg border border-gray-400 p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                  to={`/my-chats/${chat._id}`}
                >
                  <div className="h-12 w-12 rounded-full border border-gray-400">
                    <img
                      className="h-full w-full rounded-full object-cover"
                      src={`${chat.advert.image}`}
                      alt={`${chat.advert.name}`}
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="flex flex-row items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-500 sm:text-base">
                        {chat.advert.name} (
                        <span className="text-xs">
                          {
                            chat.members.find(
                              (member) => member._id !== user?.id
                            )?.username
                          }
                        </span>
                        )
                      </h3>
                      <p className="text-sm text-gray-500 sm:text-base">
                        {chat.updatedAt.split("T")[0]}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 capitalize sm:text-base">
                        {
                          chat.members.find(
                            (member) => member._id !== user?._id
                          )?.username
                        }
                        : {chat.messages[chat.messages.length - 1]?.content}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatsPage;
