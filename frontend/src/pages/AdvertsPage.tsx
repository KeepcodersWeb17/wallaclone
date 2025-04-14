import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import type State from "../store/state/types";
import { getAdverts } from "../store/actions/creators";

const AdvertsPage = () => {
  const [searchParams] = useSearchParams();

  const user = useSelector((state: State) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    // searchParams.entries() devuelve un array de arrays con los pares clave-valor de los parametros de busqueda
    // [
    // ["username", "admin"],
    // ["name", "iphone"]
    // ]

    // Object.fromEntries convierte ese array de arrays en un objeto
    // {
    // username: "admin",
    // name: "iphone"
    // }

    const queryString = new URLSearchParams(
      Object.fromEntries(searchParams.entries()),
    ).toString();

    // @ts-expect-error lo vamos a tipar mas adelante
    dispatch(getAdverts(queryString));
  }, [dispatch, searchParams]);

  const adverts = useSelector((state: State) => state.adverts);

  return (
    <>
      <nav>
        {user.username && (
          <>
            <Link to={`/users/${user.username}`}>My profile</Link>
            <Link to={`/adverts?username=${user.username}`}>My Adverts</Link>
            <Link to={`/adverts?favorite=true`}>Favorites</Link>
          </>
        )}
      </nav>

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
