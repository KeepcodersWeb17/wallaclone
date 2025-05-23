import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAdvert, getUi, getUser } from "../store/selectors/selectors";
import {
  getAdvert as getAdvertAction,
  deleteAdvert,
  toogleFavorite
} from "../store/actions/creators";
import { Advert } from "../store/state/types";
import LikeIcon from "../components/icons/Like";
import UnlikeIcon from "../components/icons/Unlike";
import ShareIcon from "../components/icons/Share";
import socket from "../store/services/sockets";
import toast from "react-hot-toast";

const AdvertPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { advert } = useParams();

  const advertId = advert?.split("-")[1] || "";

  const { loading } = useAppSelector(getUi);
  const advertDetails = useAppSelector(getAdvert(advertId)) as Advert;
  const user = useAppSelector(getUser);

  const advertOwner = advertDetails?.owner.username;

  const isFavorite = !!advertDetails?.favorites.find(
    (owner) => owner.id === user?.id
  );

  const [isLiked, setIsLiked] = useState(isFavorite);

  useEffect(() => {
    if (!advertId) {
      navigate("/404");
      return;
    }

    dispatch(getAdvertAction(advertId));

    setIsLiked(isFavorite);

    // when the server responds with the chatId, navigate to the chat page
    socket.on("chatCreated", ({ chatId }) => {
      if (chatId.error) {
        return;
      }
      navigate(`/my-chats/${chatId}`);
    });

    return () => {
      // Clean up the socket listener when the component unmounts
      socket.off("chatCreated");
    };
  }, [advert, dispatch, navigate, advertId, isFavorite]);

  const handleCloseModal = () => {
    dialogRef.current?.close();
  };

  const handleDelete = async () => {
    if (!advertDetails.id) return;
    await dispatch(deleteAdvert(advertDetails.id, navigate, handleCloseModal));
  };

  const handleLike = () => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    if (!advertDetails.id) return;

    dispatch(toogleFavorite(isFavorite, advertDetails.id));
    setIsLiked(isFavorite);
  };

  const handleShare = () => {
    //TODO: Implement share functionality
    toast("Share functionality not implemented yet", { icon: "🤷‍♂️" });
  };

  const handleOpenChat = () => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    // send a request to the server to create a chat if it doesn't exist
    socket.emit("createChat", {
      advertId: advertDetails.id,
      userId: user.id,
      ownerId: advertDetails.owner.id
    });
  };

  const handleDeleteAdvert = () => {
    dialogRef.current?.showModal();
  };

  if (!advertDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* modal */}
      <dialog
        ref={dialogRef}
        className="mx-auto mt-[30vh] rounded-2xl px-6 py-4"
      >
        <h3>Are you sure you want to delete this advert?</h3>

        <div className="mt-4 flex w-full justify-around gap-4">
          <button
            className="flex-1 cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-black hover:bg-gray-50"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          {loading ? (
            <p className="flex-1 cursor-pointer rounded-md bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700">
              Loading...
            </p>
          ) : (
            <button
              onClick={handleDelete}
              className="flex-1 cursor-pointer rounded-md bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700"
              type="submit"
            >
              Delete
            </button>
          )}
        </div>
      </dialog>

      <div className="relative w-full">
        <div className="sm:w-1/2">
          {/* navigation */}
          <nav className="flex w-full flex-row items-center justify-between">
            <div>
              <button
                className="cursor-pointer py-2"
                onClick={() => navigate(-1)}
              >
                ← Go back
              </button>
            </div>
            <div className="flex flex-row gap-4">
              {isLiked ? (
                <button className="cursor-pointer py-2" onClick={handleLike}>
                  <LikeIcon />
                </button>
              ) : (
                <button className="cursor-pointer py-2" onClick={handleLike}>
                  <UnlikeIcon />
                </button>
              )}
              <button className="cursor-pointer py-2" onClick={handleShare}>
                <ShareIcon />
              </button>
            </div>
          </nav>

          {/* actions */}
          <section className="fixed bottom-0 left-0 flex w-full items-center bg-gray-300 sm:fixed sm:top-[144px] sm:left-[50%] sm:h-[72px] sm:w-[42.5%] sm:px-4">
            <div className="m-auto flex w-7/8 flex-row gap-4 py-2 sm:w-full sm:p-0">
              {user?.id === advertDetails?.owner.id ? (
                <>
                  <Link
                    to={`/adverts/update/${advertDetails.name}-${advertDetails.id}`}
                    className="w-full rounded-md bg-black px-4 py-2.5 text-center text-sm font-medium text-white transition duration-150 active:scale-95"
                  >
                    Update
                  </Link>
                  <button
                    onClick={handleDeleteAdvert}
                    className="w-full cursor-pointer rounded-md bg-red-600 px-4 py-2.5 text-center text-sm font-medium text-white transition duration-150 active:scale-95"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  className="w-full transform cursor-pointer rounded-lg border border-black bg-black px-5 py-2 text-xs text-white transition duration-150 active:scale-95 sm:text-base"
                  onClick={handleOpenChat}
                >
                  Message
                </button>
              )}
            </div>
          </section>

          <div className="flex w-full items-center justify-center rounded-lg bg-gray-500">
            <img
              className=""
              src={advertDetails.image}
              alt={advertDetails.name}
            />
          </div>

          <h2 className="w-full text-2xl sm:text-3xl">{advertDetails.name}</h2>

          <p className="w-full text-3xl font-extrabold sm:text-4xl">
            {advertDetails.price} €
          </p>

          {/* Owner data */}
          <section className="w-full sm:fixed sm:top-[72px] sm:left-[50%] sm:h-[72px] sm:w-[42.5%] sm:px-4">
            <p className="leading-10 sm:text-lg">Published by:</p>
            <Link
              className="flex w-full flex-col"
              to={`/adverts/user/${advertOwner}`}
            >
              <div className="flex w-full flex-row items-center gap-4">
                <div className="flex items-center justify-center rounded-full bg-black">
                  <p className="flex h-8 w-8 items-center justify-center text-white sm:text-lg">
                    {advertDetails.owner.username[0].toUpperCase()}
                  </p>
                </div>
                <p className="w-full capitalize sm:text-lg">
                  {advertDetails.owner.username}
                </p>
              </div>
            </Link>
          </section>

          {/* Share */}
          <section className="hidden sm:fixed sm:top-[216px] sm:left-[50%] sm:flex sm:w-[42.5%] sm:flex-col sm:justify-center sm:px-4">
            <p className="">Share this advert on your social media:</p>
            <div className="flex w-full flex-row items-center justify-center gap-4 py-4">
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=Check%20out%20this%20great%20deal!`}
                target="_blank"
                className="w-full cursor-pointer rounded-md bg-black px-4 py-2 text-center text-sm font-medium text-white transition duration-150 active:scale-95"
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                className="w-full cursor-pointer rounded-md bg-black px-4 py-2 text-center text-sm font-medium text-white transition duration-150 active:scale-95"
              >
                Facebook
              </a>
            </div>
          </section>

          <div className="w-full">
            <div className="flex w-full flex-row items-center justify-between">
              <p className="leading-10 sm:text-xl">Description</p>
              <p className="text-xs text-gray-500 sm:text-sm">
                Ref: {advertDetails.id}
              </p>
            </div>
            <p className="mb-2 min-h-10">{advertDetails.description}</p>
          </div>

          <div className="w-full">
            <p className="text-gray-500 sm:text-base">
              Created on {advertDetails.createdAt.split("T")[0]}
            </p>
            <p className="text-gray-500 sm:text-base">
              Updated on {advertDetails.updatedAt.split("T")[0]}
            </p>
            <p className="text-gray-500 sm:text-base">
              Marked as favorite {advertDetails.favorites.length} times
            </p>
          </div>
        </div>
      </div>

      {/* //TODO Carrousel de productos relacionados...  */}
    </>
  );
};

export default AdvertPage;
