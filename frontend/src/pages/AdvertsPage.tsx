import { useEffect, useRef } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getState } from "../store/selectors/selectors";
import { getAdverts } from "../store/actions/creators";
import { buildQueryString } from "../lib/buildQueryString";
import { getParamsFilters } from "../lib/getParamsFilter";
import SortingButton from "../components/SortingButton";
import { ShowUserAdverts } from "../components/ShowUserAdverts";
import TagsDiaglog from "../components/TagsDialog";

const AdvertsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { username } = useParams();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const { user, tags, adverts, ui } = useAppSelector(getState);
  const { error, loading } = ui;

  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    const queryString = buildQueryString({
      searchParams,
      username,
      user,
      pathname,
      tags: tags.list
    });

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

  const handleNextPage = () => {
    const skip = Number(searchParams.get("skip")) || 0;
    const limit = Number(searchParams.get("limit")) || 5;

    if (skip + limit >= adverts.quantity) return;

    const params = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      skip: `${skip + limit}`
    }).toString();

    setSearchParams(params);
  };

  const handlePrevPage = () => {
    const skip = Number(searchParams.get("skip"));
    const limit = Number(searchParams.get("limit")) || 5;

    if (!skip) return;

    const newSkip = skip - limit < 0 ? 0 : skip - limit;

    const params = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      skip: `${newSkip}`
    }).toString();

    setSearchParams(params);
  };

  const handleLimit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const params = new URLSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        limit: `${event.currentTarget.value}`,
        skip: "0"
      }).toString();

      setSearchParams(params);
    }
  };

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
      <div className="bg-red-600">
        {/* Modal Cateogries */}
        <TagsDiaglog
          ref={dialogRef}
          handleClose={handleClose}
          handleSelected={handleSelected}
        />

        {/* Filtros */}
        {error && <p className="text-red-500">{error.join(", ")}</p>}
        <form className="bg-red-400" onSubmit={handleFilterSubmit}>
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
          {loading ? <p>Loading...</p> : <button type="submit">Filter</button>}
        </form>

        {/* Filter by user */}
        <ShowUserAdverts />

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
        <div className="flex justify-center gap-5">
          <button type="button" onClick={handlePrevPage}>
            Previous
          </button>
          <button type="button" onClick={handleNextPage}>
            Next
          </button>
          <input
            type="number"
            step={2}
            min={2}
            max={10}
            onKeyDown={handleLimit}
            placeholder="Limit"
          />
        </div>

        <section>
          <p>Lates ads published</p>
          {adverts.list.length === 0 ? (
            <p> No adverts </p>
          ) : (
            <ul className="">
              {adverts.list.map((advert) => (
                <li key={`${advert.name}-${advert.id}`} className="">
                  <Link to={`/adverts/${advert.name}-${advert.id}`}>
                    {/* //TODO conviene usar figure? */}
                    <figure>
                      <picture>
                        <source srcSet={advert.image} type="image/webp" />
                        <source srcSet={advert.image} type="image/jpeg" />{" "}
                        <img
                          src={advert.image}
                          alt={advert.name}
                          className="object-cover"
                        />
                      </picture>
                    </figure>
                    <div>
                      <h3>{advert.name}</h3>
                      <p>{advert.description}</p>
                      <p>Price: {advert.price}</p>
                      {/* //TODO esto se puede mejorar */}
                      <p>{advert.sale === "sell" ? "For sell" : "To buy"}</p>
                    </div>
                  </Link>
                  <Link to={`/adverts/user/${advert.owner?.username}`}>
                    Published by: {advert.owner?.username}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

export default AdvertsPage;
