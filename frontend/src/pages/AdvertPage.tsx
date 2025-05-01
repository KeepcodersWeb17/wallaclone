import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAdvert, getUi, getUser } from "../store/selectors/selectors";
import {
  getAdvert as getAdvertAction,
  deleteAdvert
  // toogleFavorite
} from "../store/actions/creators";
import { Advert } from "../store/state/types";
import LikeIcon from "../components/icons/Like";
import UnlikeIcon from "../components/icons/Unlike";
import ShareIcon from "../components/icons/Share";

const AdvertPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const { advert } = useParams();

  const advertId = advert?.split("-")[1] || "";

  const dispatch = useAppDispatch();
  const advertDetails = useAppSelector(getAdvert(advertId)) as Advert;
  const user = useAppSelector(getUser);
  const { error, loading } = useAppSelector(getUi);

  const advertOwner = advertDetails?.owner.username;
  // const isOwner = user?.username === advertOwner;
  // const isFavorite = !!advertDetails?.favorites.find(
  //   (owner) => owner.id === user?.id
  // );

  useEffect(() => {
    if (!advertId) {
      navigate("/404");
      return;
    }
    dispatch(getAdvertAction(advertId));
  }, [advert, dispatch, navigate, advertId]);

  // const handleOpenModal = () => {
  //   dialogRef.current?.showModal();
  // };

  const handleCloseModal = () => {
    dialogRef.current?.close();
  };

  const handleDelete = () => {
    if (!advertDetails.id) return;
    dispatch(deleteAdvert(advertDetails.id, navigate, handleCloseModal));
  };

  // const handleFavorite = () => {
  //   if (!user?.id || !advertDetails.id) {
  //     navigate("/login");
  //     return;
  //   }

  //   dispatch(toogleFavorite(isFavorite, advertDetails.id));
  // };

  // const textFavorite = isFavorite ? "unset" : "set";

  // const textStatus =
  //   advertDetails?.sale === "sell" ? "for sale" : "looking to buy";

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {};

  const handleShare = () => {};

  const handleOpenChat = () => {};

  return (
    <>
      {/* modal */}
      <dialog
        ref={dialogRef}
        className="mx-auto mt-[30vh] rounded-2xl px-6 py-4"
      >
        <h3>Are you sure you want to delete this advert?</h3>

        {error && <p className="text-red-500">{error.join(", ")}</p>}
        <div className="mt-4 flex justify-around">
          <button className="cursor-pointer" onClick={handleCloseModal}>
            Cancel
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button className="cursor-pointer" onClick={handleDelete}>
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
              <button className="h-10 cursor-pointer">Go back</button>
            </div>
            <div className="flex flex-row gap-4">
              {isLiked ? (
                <button className="h-10 cursor-pointer" onClick={handleLike}>
                  <LikeIcon />
                </button>
              ) : (
                <button className="h-10 cursor-pointer" onClick={handleLike}>
                  <UnlikeIcon />
                </button>
              )}
              <button className="h-10 cursor-pointer" onClick={handleShare}>
                <ShareIcon />
              </button>
            </div>
          </nav>

          {/* actions */}
          <section className="fixed bottom-0 w-full p-4 sm:fixed sm:top-[144px] sm:left-[50%] sm:h-[72px] sm:w-[42.5%] sm:px-4">
            {user?.id === advertDetails?.owner.id ? (
              <div className="flex flex-row gap-4">
                <button className="w-full transform cursor-pointer rounded-lg border border-black bg-black px-5 py-1.5 text-xs text-white transition duration-150 active:scale-95 sm:h-10">
                  Update
                </button>
                <button className="w-full transform cursor-pointer rounded-lg border border-black bg-black px-5 py-1.5 text-xs text-white transition duration-150 active:scale-95 sm:h-10">
                  Delete
                </button>
              </div>
            ) : (
              <button
                className="w-full transform cursor-pointer rounded-lg border border-black bg-black px-5 py-1.5 text-xs text-white transition duration-150 active:scale-95 sm:h-10 sm:text-base"
                onClick={handleOpenChat}
              >
                Message
              </button>
            )}
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
                <div className="flex h-8 w-10 items-center justify-center rounded-full bg-black">
                  <p className="flex items-center justify-center text-white sm:text-lg">
                    {advertDetails.owner.username[0].toUpperCase()}
                  </p>
                </div>
                <p className="w-full leading-10 capitalize sm:text-lg">
                  {advertDetails.owner.username}
                </p>
              </div>
            </Link>
          </section>

          <div className="w-full">
            <div className="flex w-full flex-row items-center justify-between">
              <p className="leading-10 sm:text-xl">Description</p>
              <p className="text-xs text-gray-500 sm:text-sm">
                Ref: {advertDetails.id}
              </p>
            </div>
            <p className="min-h-10">{advertDetails.description}</p>
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

      {/* Carrousel de productos relacionados... */}
    </>
  );
};

export default AdvertPage;
