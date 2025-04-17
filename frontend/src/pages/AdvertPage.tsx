import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAdvert, getUser } from "../store/selectors/selectors";
import {
  getAdvert as getAdvertAction,
  deleteAdvert,
  toogleFavorite
} from "../store/actions/creators";

const AdvertPage = () => {
  const user = useAppSelector(getUser);

  const advertDetails = useAppSelector(getAdvert);

  const IsFavoriteInitialState =
    !!user?.id &&
    Array.isArray(advertDetails?.favorites) &&
    advertDetails?.favorites?.some((favorite) => favorite.id === user.id);

  const [openModal, setOpenModal] = useState(false);

  const [isFavorite, setIsFavorite] = useState(IsFavoriteInitialState);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { advert } = useParams();

  const advertId = advert ? advert.split("-")[1] : null;

  useEffect(() => {
    if (advertId) dispatch(getAdvertAction(advertId));
  }, [advertId, dispatch]);

  const handleDelete = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmDelete = async () => {
    if (!advertId) return;
    await dispatch(deleteAdvert(advertId));
    alert("Advert deleted");
    handleCloseModal();
    navigate("/adverts");
  };

  const handleFavorite = async () => {
    if (!user?.id || !advertId) {
      navigate("/login");
      return;
    }

    setIsFavorite((favorite) => !favorite);

    await dispatch(toogleFavorite(isFavorite, advertId));

    const status = isFavorite ? "unmarked" : "marked";
    const message = `Advert ${status} as favorite`;
    alert(message);
  };

  return (
    <>
      <dialog open={openModal}>
        <h3>
          Are you sure you want to delete this advert?
          <button onClick={handleCloseModal}>Cancel</button>
          <button onClick={handleConfirmDelete}>Delete</button>
        </h3>
      </dialog>
      {!advertDetails ? (
        <p>Advert not found</p>
      ) : (
        <article>
          <header>
            <nav>
              <button onClick={() => navigate(-1)}>Go back</button>
              <button onClick={handleFavorite}>
                {isFavorite ? "unset as favorite" : "set as favorite"}
              </button>
              <button>Share</button>
            </nav>
          </header>

          <section>
            <div>
              <img src={advertDetails.image} alt={advertDetails.name} />
            </div>

            <div>
              <h2>{advertDetails.name}</h2>
            </div>

            <div>
              <p>{advertDetails.price} €</p>
            </div>

            <div>
              <p>
                Published by:{" "}
                <Link to={`/adverts?username=${advertDetails.owner?.username}`}>
                  {advertDetails.owner?.username}
                </Link>
              </p>
              <p>
                Status:{" "}
                {advertDetails.sale === "sell" ? (
                  <span>for sale</span>
                ) : (
                  <span>looking to buy</span>
                )}
              </p>
            </div>

            <div>
              {user?.username === advertDetails.owner?.username ? (
                <>
                  <button onClick={handleDelete}>Delete</button>
                  <Link
                    to={`/adverts/update/${advertDetails.name}-${advertDetails.id}`}
                  >
                    Update
                  </Link>
                </>
              ) : (
                <button>Send a message</button>
              )}
            </div>

            <div>
              <p>Description:</p>
              {!advertDetails.description ? (
                <p>No description available</p>
              ) : (
                <p>{advertDetails.description}</p>
              )}
            </div>
          </section>
          <footer>
            <p>Published on {advertDetails.createdAt?.split("T")[0]}</p>

            {advertDetails.updatedAt !== advertDetails.createdAt && (
              <p>Updated on {advertDetails.updatedAt?.split("T")[0]}</p>
            )}

            <p>Marked as favorite {advertDetails.favorites?.length} times</p>
          </footer>
        </article>
      )}
    </>
  );
};

export default AdvertPage;
