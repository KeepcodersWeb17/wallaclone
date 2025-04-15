import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import type State from "../store/state/types";
import CloseIcon from "../components/icons/Close";
import { getAdverts } from "../store/actions/creators";

const AdvertsPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { username } = useParams();

  // const user = useSelector((state: State) => state.user);

  const adverts = useSelector((state: State) => state.adverts);
  const user = useSelector((state: State) => state.user);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

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

  const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(
      Array.from(event.currentTarget.querySelectorAll("input")).map(
        (element) => element.value,
      ),
    );

    const filters = Array.from(
      event.currentTarget.querySelectorAll("input"),
    ).map((element) => element.value);

    const params: { name?: string; price?: string } = {};

    if (filters[0]) {
      params.name = filters[0];
    }

    if (filters[1]) {
      params.price = `${filters[1]}-`;
    }

    if (filters[2]) {
      params.price = params.price
        ? `${filters[1]}-${filters[2]}`
        : `-${filters[2]}`;
    }

    setSearchParams(params);
  };

  const handleOpenModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpenModal(true);
  };

  const handleCloseModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpenModal(false);
  };

  return (
    <>
      {/* Modal Cateogries */}
      {isOpenModal && (
        <dialog className="fixed inset-0 flex h-full w-full flex-col place-content-center items-center gap-10">
          <button
            className="absolute top-5 right-5 cursor-pointer"
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </button>
          <h2 className="">Categories</h2>
          <ul className="sh flex w-full flex-col gap-5 text-center">
            <li className="cursor-pointer rounded hover:bg-gray-100">Work</li>
            <li className="cursor-pointer rounded hover:bg-gray-100">
              Lifestyle
            </li>
            <li className="cursor-pointer rounded hover:bg-gray-100">Motor</li>
            <li className="cursor-pointer rounded hover:bg-gray-100">Mobile</li>
          </ul>
        </dialog>
      )}

      {/* Filtros */}
      <form onSubmit={handleFilterSubmit}>
        <input type="text" name="advertName" placeholder="Advert name..." />
        <input
          type="number"
          name="minPrice"
          id="minPrice"
          min={0}
          placeholder="Min"
        />
        <input
          type="number"
          name="maxPrice"
          id="maxPrice"
          min={0}
          placeholder="Max"
        />
        <button onClick={handleOpenModal}>Category</button>
        <button type="submit">Filter</button>
      </form>
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
