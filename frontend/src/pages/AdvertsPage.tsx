import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getState } from "../store/selectors/selectors";
import { getAdverts } from "../store/actions/creators";
import { buildQueryString } from "../lib/buildQueryString";
// import { getParamsFilters } from "../lib/getParamsFilter";
import SortingButton from "../components/SortingButton";
// import { ShowUserAdverts } from "../components/ShowUserAdverts";
import TagsDiaglog from "../components/TagsDialog";
import CancelIcon from "../components/icons/Cancel";
import CloseIcon from "../components/icons/Close";

const AdvertsPage = () => {
  const { user, tags, adverts, ui } = useAppSelector(getState);

  const [searchParams, setSearchParams] = useSearchParams();
  const advertNameParam = searchParams.get("name");

  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const { pathname } = useLocation();
  const { username } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const { error } = ui;

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

  // const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const filters = Array.from(
  //     event.currentTarget.querySelectorAll("input")
  //   ).map((element) => element.value);

  //   const tagsFilters = Array.from(
  //     dialogRef.current!.querySelectorAll("li[selected]")
  //   )
  //     .map((element) => element.textContent)
  //     .join("-")
  //     .toLowerCase();

  //   const params = getParamsFilters({ filters, tagsFilters, searchParams });

  //   setSearchParams(params);
  // };

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

  const handleOpenCategories = async () => {
    dialogRef.current?.showModal();
  };

  const handleCloseCategories = () => {
    dialogRef.current?.close();

    const selectedTags = dialogRef.current?.querySelectorAll("li[selected]");

    const selectedValues = Array.from(selectedTags!).map(
      (tag) => tag.textContent?.toLocaleLowerCase().trim() || ""
    );

    setCategories(selectedValues);
  };

  const handleSelected = (event: React.MouseEvent) => {
    event.currentTarget.toggleAttribute("selected");
    event.currentTarget.classList.toggle("bg-yellow-200");
  };

  const handleSearchByName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleResetForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.closest("form") as HTMLFormElement;
    const input = form.querySelector(
      "input[name='advertName']"
    ) as HTMLInputElement;
    input.value = "";
  };

  const handleOpenFilters = () => {
    setIsModalFiltersOpen(true);
  };

  const handleCloseFilters = () => {
    setIsModalFiltersOpen(false);
  };

  const handleFiltersSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCloseFilters();

    const formData = new FormData(event.currentTarget);

    const min = formData.get("min") as string;
    const max = formData.get("max") as string;
    const owner = formData.get("owner") as string;
    const categories = formData.get("categories") as string;

    const params = new URLSearchParams();

    if (min || max) {
      // si hay alguno de los dos, armamos el price
      const price = `${min ?? ""}-${max ?? ""}`;
      params.set("price", price);
    }

    let path = "/adverts";

    if (owner) {
      path += `/user/${encodeURIComponent(owner)}`;
    }

    if (categories) {
      params.set("tags", categories);
    }

    const queryString = params.toString();

    if (queryString) {
      path += `?${queryString}`;
    }

    navigate(path);
  };

  return (
    <>
      {/* Modal Filters */}
      {isModalFiltersOpen && (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-100 bg-red-50 p-4">
          <div className="flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-lg leading-10 font-bold">Filters</h3>
              <button
                className="cursor-pointer"
                type="button"
                onClick={handleCloseFilters}
              >
                <CloseIcon />
              </button>
            </div>
            <form
              className="flex w-full flex-col items-center justify-center gap-16"
              onSubmit={handleFiltersSubmit}
            >
              <div className="flex w-full flex-col gap-4">
                {/* Filter by price */}
                <div className="flex w-full flex-col gap-2">
                  <p className="leading-7 font-bold">Price</p>
                  <div className="flex flex-row gap-2">
                    <input
                      className="h-10 w-1/2 rounded-lg border border-gray-400 p-1.5 px-4 text-xs placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none md:w-100"
                      type="number"
                      name="min"
                      min={0}
                      placeholder="Min"
                    />
                    <input
                      className="h-10 w-1/2 rounded-lg border border-gray-400 p-1.5 px-4 text-xs placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none md:w-100"
                      type="number"
                      name="max"
                      min={0}
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Filter by owner */}
                <div className="flex w-full flex-col gap-2">
                  <p className="leading-7 font-bold">Owner</p>
                  <div className="flex flex-row gap-2">
                    <input
                      className="h-10 w-full rounded-lg border border-gray-400 p-1.5 px-4 text-xs placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none md:w-100"
                      type="text"
                      name="owner"
                      placeholder="Example: guille"
                    />
                  </div>
                </div>

                {/* Filter by category */}
                <div className="flex w-full flex-col gap-2">
                  <p className="leading-7 font-bold">Categories</p>
                  <div className="flex flex-row gap-2">
                    <input
                      className="flex h-10 w-full flex-row items-center justify-between rounded-lg border border-gray-400 p-1.5 px-4 text-xs placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none md:w-100"
                      type="text"
                      name="categories"
                      placeholder="Select categories"
                      value={categories.join("-")}
                      readOnly
                    />
                    <button
                      className="cursor-pointer rounded-lg border border-gray-400 px-5 py-1.5 text-xs text-gray-400 hover:bg-black hover:text-white"
                      onClick={handleOpenCategories}
                      type="button"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="h-10 w-full cursor-pointer rounded-lg border border-gray-400 p-1.5 px-4 text-sm hover:bg-black hover:text-white"
                type="submit"
              >
                Filter
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Cateogries */}
      <TagsDiaglog
        ref={dialogRef}
        handleClose={handleCloseCategories}
        handleSelected={handleSelected}
      />

      <div className="flex w-full flex-col items-center justify-center gap-6">
        {/* Search by name + button open filters */}
        <section className="flex w-full flex-col items-center justify-center gap-4 md:flex-row lg:gap-8">
          <form className="relative flex w-full" onSubmit={handleSearchByName}>
            <input
              className="h-10 w-full flex-grow rounded-lg border border-gray-400 p-1.5 px-4 text-xs placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none md:w-100"
              type="text"
              name="advertName"
              id="advertName"
              placeholder="Example: iPhone 14 Pro Max"
              defaultValue={advertNameParam || ""}
            />
            <button
              className="absolute top-2 right-2 cursor-pointer"
              onClick={handleResetForm}
            >
              <CancelIcon />
            </button>
          </form>
          <button
            className="h-10 w-full cursor-pointer rounded-lg border border-gray-400 p-1.5 px-4 text-xs placeholder:italic hover:bg-black hover:text-white focus:ring-1 focus:ring-gray-500 focus:outline-none md:w-100"
            type="button"
            onClick={handleOpenFilters}
          >
            Filters
          </button>
          {error && (
            <p className="w-full leading-10 text-red-500">{error.join(", ")}</p>
          )}
        </section>

        {/* Filtros */}
        {/* {error && <p className="text-red-500">{error.join(", ")}</p>}
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
          <button type="button" onClick={handleOpenCategories}>
            Category
          </button>
          {loading ? <p>Loading...</p> : <button type="submit">Filter</button>}
        </form> */}

        {/* Filter by user */}
        {/* <ShowUserAdverts /> */}

        {/* Sorting */}
        <section className="flex w-full flex-col justify-between gap-1 md:flex-row">
          <p className="text-sm leading-10">Sort by: </p>
          <div className="flex w-full flex-row items-center justify-between gap-2 md:w-16/18">
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
        </section>

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

        {/* List of adverts */}
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
