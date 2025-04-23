import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../store/selectors/selectors";
import { useAppSelector } from "../store/store";

// type Chat = {
//   id: string;
//   advertName: string;
//   messages: {
//     id: string;
//     content: string;
//     sender: string;
//     createdAt: string;
//   }[];
//   members: string[];
//   createdAt: string;
//   updatedAt: string;
// };

const ChatsPage = () => {
  const user = useAppSelector(getUser);
  const chats = user?.chats;

  // const chats = [
  //   {
  //     id: "1",
  //     advertName: "Chat 1",
  //     messages: [
  //       {
  //         id: "1",
  //         content: "Hello!",
  //         sender: "User2",
  //         createdAt: "2023-10-01T12:00:00Z"
  //       },
  //       {
  //         id: "2",
  //         content: "Hi! How are you?",
  //         sender: "User1",
  //         createdAt: "2023-10-01T12:05:00Z"
  //       }
  //     ],
  //     members: [user?.id, "User1"],
  //     createdAt: "2023-10-01T12:00:00Z",
  //     updatedAt: "2023-10-01T12:05:00Z"
  //   },
  //   {
  //     id: "2",
  //     advertName: "Chat 2",
  //     messages: [
  //       {
  //         id: "3",
  //         content: "Hello!",
  //         sender: "User3",
  //         createdAt: "2023-10-01T12:00:00Z"
  //       },
  //       {
  //         id: "4",
  //         content: "Hi! How are you?",
  //         sender: "User1",
  //         createdAt: "2023-10-01T12:05:00Z"
  //       }
  //     ],
  //     members: [user?.id, "User2"],
  //     createdAt: "2023-10-01T12:00:00Z",
  //     updatedAt: "2023-10-01T12:05:00Z"
  //   },
  //   {
  //     id: "3",
  //     advertName: "Chat 3",
  //     messages: [
  //       {
  //         id: "5",
  //         content: "Hello!",
  //         sender: "User3",
  //         createdAt: "2023-10-01T12:00:00Z"
  //       },
  //       {
  //         id: "6",
  //         content: "Hi! How are you?",
  //         sender: "User1",
  //         createdAt: "2023-10-01T12:05:00Z"
  //       }
  //     ],
  //     members: [user?.id, "User3"],
  //     createdAt: "2023-10-01T12:00:00Z",
  //     updatedAt: "2023-10-01T12:05:00Z"
  //   }
  // ] as Chat[];

  useEffect(() => {
    // Hacer la llamada a la API para obtener los chats
  });

  // URL de ejemplo: /my-messages/advertId-ownerId-userId
  //

  return (
    <>
      <h2>My Messages</h2>
      <ul>
        {chats &&
          chats.map((chat) => (
            <Link
              to={`/my-messages/${chat.id}-${user?.id}-${chat.members.find(
                (member) => user?.id !== member
              )}`}
              key={chat.id}
            >
              <li>
                <h3>{chat.advert}</h3>
                <p>
                  Chat with:{" "}
                  {chat.members.find((member) => user?.id !== member)}
                </p>
                <p>Created at: {chat.createdAt.split("T")[0]}</p>
                <p>Last updated: {chat.updatedAt.split("T")[0]}</p>
              </li>
            </Link>
          ))}
      </ul>
    </>
  );
};

export default ChatsPage;
