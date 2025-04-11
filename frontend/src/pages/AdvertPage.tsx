import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type State from "../store/state/types";
import { getAdvert } from "../store/actions/creators";

const AdvertPage = () => {
  const dispatch = useDispatch();

  const { advert } = useParams();
  const advertId = advert ? advert.split("-")[1] : null;

  useEffect(() => {
    if (advertId)
      // @ts-expect-error lo vamos a tipar mas adelante
      dispatch(getAdvert(advertId));
  }, [advertId, dispatch]);

  const advertDetails = useSelector((state: State) => state.advert);
  const user = useSelector((state: State) => state.user);

  return (
    <>
      {!advertId || !advertDetails ? (
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
          <main>
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
              <p>Published by: {advertDetails.owner}</p>
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
              {user.id === advertDetails.owner ? (
                <>
                  <button>Delete</button>
                  <Link to={"/adverts/update"}>Update</Link>
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
          </main>
          <footer>
            <p>Published on {advertDetails.createdAt}</p>

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
