import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams
} from "react-router-dom";
import type State from "../store/state/types";
import CloseIcon from "../components/icons/Close";
import { getAdverts, getAllTags } from "../store/actions/creators";
import { buildQueryString } from "../lib/buildQueryString";
import SortingButton from "../components/SortingButton";
import { getParamsFilters } from "../lib/getParamsFilter";

const AdvertsPage = () => {
  // const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { username } = useParams();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const { user, tags, adverts } = useSelector((state: State) => state);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    // @ts-expect-error lo vamos a tipar mas adelante
    dispatch(getAllTags());
  }, [dispatch]);

  useEffect(() => {
    const queryString = buildQueryString({
      searchParams,
      username,
      user,
      pathname,
      tags
    });
    // @ts-expect-error lo vamos a tipar mas adelante
    dispatch(getAdverts(queryString));
  }, [dispatch, searchParams, username, user, pathname, tags]);

  const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filters = Array.from(
      event.currentTarget.querySelectorAll("input")
    ).map((element) => element.value);

    const tagsFilters = Array.from(
      dialogRef.current!.querySelectorAll("li[selected]")
    )
      .map((element) => element.textContent)
      .join("-")
      .toLowerCase();

    const params = getParamsFilters({ filters, tagsFilters, searchParams });

    setSearchParams(params);
  };
  // Reutilizable para los 6 tipos de SORTING
  const handleSortParamsClick = (queryParam: string) => {
    const params = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sort: queryParam
    }).toString();

    setSearchParams(params);
  };

  // Paginacion, necesitamos quantity para el handleNextPage
  // const handleNextPageClick = (event: React.MouseEvent) => {}:
  // const handlePrevPageClick = (event: React.MouseEvent) => {};

  const handleOpenModal = async () => {
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
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="cursor-pointer rounded hover:bg-gray-100"
              onClick={handleSelected}
            >
              {tag.name}
            </li>
          ))}
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

      {/* Sorting */}
      <div className="flex justify-center gap-5">
        <SortingButton
          queryParam="date-asc"
          setSearchParams={handleSortParamsClick}
        />
        <SortingButton
          queryParam="name-asc"
          setSearchParams={handleSortParamsClick}
        />
        <SortingButton
          queryParam="price-desc"
          setSearchParams={handleSortParamsClick}
        />
      </div>

      {/* Paginacion */}

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
