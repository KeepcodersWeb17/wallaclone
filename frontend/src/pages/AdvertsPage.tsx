import { useEffect, useRef } from "react";
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
  // const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { username } = useParams();

  const dialogRef = useRef<HTMLDialogElement>(null);

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

    const filters = Array.from(
      event.currentTarget.querySelectorAll("input"),
    ).map((element) => element.value);

    const tagsFilters = Array.from(
      dialogRef.current!.querySelectorAll("li[selected]"),
    )
      .map((element) => element.textContent)
      .join(",")
      .toLowerCase();

    const params: {
      username?: string;
      name?: string;
      price?: string;
      tags?: string;
    } = {};

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

    if (tagsFilters) {
      params.tags = tagsFilters;
    }

    setSearchParams(params);
  };

  const handleOpenModal = () => {
    dialogRef.current?.showModal();
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  const handleSelected = (event: React.MouseEvent) => {
    event.currentTarget.toggleAttribute("selected");
    event.currentTarget.classList.toggle("bg-yellow-200");
  };

  return (
    <>
      {/* Modal Cateogries */}
      <dialog ref={dialogRef} className="h-full w-full">
        <button
          className="absolute top-5 right-5 cursor-pointer"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>
        <h2 className="">Categories</h2>
        <ul className="sh flex w-full flex-col gap-5 text-center">
          <li
            className="cursor-pointer rounded hover:bg-gray-100"
            onClick={handleSelected}
          >
            Work
          </li>
          <li
            className="cursor-pointer rounded hover:bg-gray-100"
            onClick={handleSelected}
          >
            Lifestyle
          </li>
          <li
            className="cursor-pointer rounded hover:bg-gray-100"
            onClick={handleSelected}
          >
            Motor
          </li>
          <li
            className="cursor-pointer rounded hover:bg-gray-100"
            onClick={handleSelected}
          >
            Mobile
          </li>
        </ul>
        <button onClick={handleClose}>Confirm</button>
      </dialog>

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
        <button type="button" onClick={handleOpenModal}>
          Category
        </button>
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
              <Link to={`/adverts/user/${advert.owner?.username}`}>
                Owner: {advert.owner?.username}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AdvertsPage;
