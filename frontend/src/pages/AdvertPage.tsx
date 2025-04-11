import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type State from "../store/state/types";
import { getAdvert } from "../store/actions/creators";

const AdvertPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const { advert } = useParams();

  const advertId = advert ? advert.split("-")[1] : null;

  const dispatch = useDispatch();

  useEffect(() => {
    if (advertId)
      // @ts-expect-error lo vamos a tipar mas adelante
      dispatch(getAdvert(advertId));
  }, [advertId, dispatch]);

  const advertDetails = useSelector((state: State) => state.advert);
  const user = useSelector((state: State) => state.user);

  const handleDelete = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmDelete = async () => {
    alert("Advert deleted");
    // await dispatch(deleteAdvert(advertId));
    handleCloseModal();
    navigate("/adverts");
  };

  return (
    <>
      <dialog open={openModal}>
        <h3>
          Are you sure you want to delete this advert? This action cannot be
          undone.
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
              <button>Favorite</button>
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
                  <Link to={`/adverts/update/${advertDetails.id}`}>Update</Link>
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
