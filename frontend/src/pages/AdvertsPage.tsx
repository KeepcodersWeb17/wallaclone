import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import type State from "../store/state/types";
import { getAdverts } from "../store/actions/creators";

const AdvertsPage = () => {
  const [searchParams] = useSearchParams();

  const { username } = useParams();

  // const user = useSelector((state: State) => state.user);

  const adverts = useSelector((state: State) => state.adverts);
  const user = useSelector((state: State) => state.user);

  const dispatch = useDispatch();

  const pathname = window.location.pathname;

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

    let queryString = "";

    if (pathname.includes("/favorites") && username) {
      queryString += `favorites=${user?.id}`;
    }

    if (pathname.includes("/user") && username) {
      queryString += `username=${username}`;
    }

    queryString +=
      "&" +
      new URLSearchParams(
        Object.fromEntries(searchParams.entries()),
      ).toString();

    // @ts-expect-error lo vamos a tipar mas adelante
    dispatch(getAdverts(queryString));
  }, [dispatch, searchParams, username, user?.id, pathname]);

  return (
    <>
      <h2>Adverts</h2>

      {adverts.length === 0 ? (
        <p> No adverts </p>
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
