import { Link } from "react-router-dom";
import { Chat } from "../store/state/types";
import { useAppSelector } from "../store/store";
import { getUser } from "../store/selectors/selectors";

const ChatsPage = () => {
  const user = useAppSelector(getUser);
  const chats = user?.chats as Chat[];

  return (
    <div className="flex min-h-100 w-full flex-col rounded-lg border border-gray-400 sm:max-w-7/8">
      <h2 className="flex items-center justify-between border-b border-gray-400 px-4 text-center leading-10 font-bold sm:text-lg md:text-xl">
        Chats
      </h2>
      {chats.length === 0 ? (
        <div className="flex flex-grow items-center justify-center px-6 py-2">
          <p>You don't have any chats yet.</p>
        </div>
      ) : (
        <div className="flex flex-grow items-center justify-center px-6 py-2">
          <ul>
            {chats.map((chat) => (
              <li key={chat._id}>
                <Link to={`/my-chats/${chat._id}`}>
                  <div className="h-12 w-12 rounded-full border border-gray-400">
                    <img
                      src={`${chat.advert.image}`}
                      alt={`${chat.advert.name}`}
                    />
                  </div>
                  <div>
                    <h3>{chat.advert.name}</h3>
                    <p>
                      {
                        chat.members.find((member) => member._id !== user?._id)
                          ?.username
                      }
                    </p>

                    {/* <p>{chat.messages[-1].sender.username}</p>
                    <p>{chat.messages[-1].content}</p> */}
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
