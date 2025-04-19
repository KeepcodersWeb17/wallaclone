import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAdvert, getUser } from "../store/selectors/selectors";
import {
  getAdvert as getAdvertAction,
  deleteAdvert,
  toogleFavorite
} from "../store/actions/creators";

const AdvertPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const { advert } = useParams();

  const dispatch = useAppDispatch();
  const advertDetails = useAppSelector(getAdvert);
  const user = useAppSelector(getUser);

  const advertOwner = advertDetails?.owner.username;
  const isOwner = user?.username === advertOwner;
  const isFavorite = !!advertDetails?.favorites.find(
    (owner) => owner.id === user?.id
  );

  useEffect(() => {
    if (!advert || !advert.includes("-")) {
      navigate("/404");
      return;
    }
    dispatch(getAdvertAction(advert.split("-")[1]));
  }, [advert, dispatch, navigate]);

  const handleOpenModal = () => {
    dialogRef.current?.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current?.close();
  };

  const handleDelete = () => {
    if (!advertDetails.id) return;
    handleCloseModal();
    dispatch(deleteAdvert(advertDetails.id, navigate));
  };

  const handleFavorite = () => {
    if (!user?.id || !advertDetails.id) {
      navigate("/login");
      return;
    }

    dispatch(toogleFavorite(isFavorite, advertDetails.id));
  };

  const textFavorite = isFavorite ? "unset" : "set";

  const textStatus =
    advertDetails?.sale === "sell" ? "for sale" : "looking to buy";

  return (
    <>
      {/* modal */}
      <dialog ref={dialogRef}>
        <h3>Are you sure you want to delete this advert?</h3>
        <button onClick={handleCloseModal}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </dialog>

      {/* advertDetail  */}
      <article>
        <header>
          <nav>
            <button onClick={() => navigate(-1)}>Go back</button>
            <button onClick={handleFavorite}>{textFavorite} favorite</button>
            <button>Share</button>
          </nav>
        </header>

        <section>
          <div className="h-auto w-1/5">
            <img src={advertDetails?.image} alt={advertDetails?.name} />
          </div>

          <div>
            <h2>{advertDetails?.name}</h2>
          </div>

          <div>
            <p>{advertDetails?.price} €</p>
          </div>

          <div>
            <p>
              Published by:{" "}
              <Link to={`/adverts/user/${advertOwner}`}>{advertOwner}</Link>
            </p>
            <p>Status: {textStatus}</p>
          </div>

          {/* actions */}
          {isOwner ? (
            <div>
              <button onClick={handleOpenModal}>Delete</button>
              <Link
                to={`/adverts/update/${advertDetails.name}-${advertDetails.id}`}
              >
                Update
              </Link>
            </div>
          ) : (
            <div>
              <button>Send a message</button>
              <button>Buy</button>
            </div>
          )}

          <div>
            <p>Description:</p>
            {!advertDetails?.description ? (
              <p>No description available</p>
            ) : (
              <p>{advertDetails?.description}</p>
            )}
          </div>
        </section>

        <footer>
          <p>Published on {advertDetails?.createdAt?.split("T")[0]}</p>

          {advertDetails?.updatedAt !== advertDetails?.createdAt && (
            <p>Updated on {advertDetails?.updatedAt?.split("T")[0]}</p>
          )}

          <p>Marked as favorite {advertDetails?.favorites?.length} times</p>
        </footer>
      </article>
    </>
  );
};

export default AdvertPage;
