import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import type State from "../store/state/types";
import { getAdverts } from "../store/actions/creators";

const AdvertsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    // si no existe el param lo creamos con un valor por defecto.
    const username = searchParams.get("username") ?? "";

    // @ts-expect-error lo vamos a tipar mas adelante
    dispatch(getAdverts(username));
  }, [dispatch, searchParams]);

  const adverts = useSelector((state: State) => state.adverts);

  return (
    <>
      <h2>Adverts</h2>
      {adverts.length === 0 ? (
        <p>No adverts available.</p>
      ) : (
        <ul>
          {adverts.map((advert) => (
            <li key={advert.id}>
              <Link to={`/adverts/${advert.name}-${advert.id}`}>
                <div>
                  <img src={advert.image} alt={advert.name} />
                </div>
                <div>
                  <h3>{advert.name}</h3>
                  <p>{advert.description}</p>
                  <p>Price: {advert.price}</p>
                  <p>On: {advert.sale}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AdvertsPage;
