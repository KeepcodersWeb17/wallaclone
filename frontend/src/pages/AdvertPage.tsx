import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type State from "../store/state/types";
import {
  getAdvert,
  deleteAdvert,
  toogleFavorite,
} from "../store/actions/creators";

const AdvertPage = () => {
  const user = useSelector((state: State) => state.user);

  const advertDetails = useSelector((state: State) => state.advert);

  const IsFavoriteInitialState = advertDetails?.favorites?.includes(user.id)

  const [openModal, setOpenModal] = useState(false);

  const [isFavorite, setIsFavorite] = useState(IsFavoriteInitialState);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { advert } = useParams();

  const advertId = advert ? advert.split("-")[1] : null;

  useEffect(() => {
    if (advertId)
      // @ts-expect-error lo vamos a tipar mas adelante
      dispatch(getAdvert(advertId));
  }, [advertId, dispatch]);

  const handleDelete = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmDelete = async () => {
    // @ts-expect-error lo vamos a tipar mas adelante
    await dispatch(deleteAdvert(advertId));
    alert("Advert deleted");
    handleCloseModal();
    navigate("/adverts");
  };

  const handleFavorite = async () => {
    setIsFavorite((favorite) => !favorite);

    // @ts-expect-error lo vamos a tipar mas adelante
    await dispatch(toogleFavorite(isFavorite,advertId));

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
              <Link to="/adverts">Go back</Link>
              <button onClick={handleFavorite}>
                {isFavorite ? "unset as favorite" : "set as favorite"}
              </button>
              <button>Share</button>
            </nav>
          </header>

          <section>
            <div>
              {!advertDetails.image ? (
                <img
                  src="https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                  alt="no-image"
                />
              ) : (
                <img src={advertDetails.image} alt={advertDetails.name} />
              )}
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
                <Link to={`/adverts?username=${advertDetails.owner}`}>
                  {advertDetails.owner}
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
              {user.username === advertDetails.owner ? (
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
              <p>Updated on {advertDetails.updatedAt}</p>
            )}

            <p>Marked as favorite {"0"} times</p>
          </footer>
        </article>
      )}
    </>
  );
};

export default AdvertPage;
