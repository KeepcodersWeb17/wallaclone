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
import LikeIcon from "../components/icons/Like";
import UnlikeIcon from "../components/icons/Unlike";
import { toogleFavorite } from "../store/actions/creators";

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

  const handleLimit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const limit = formData.get("limit") as string;

    const params = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      limit: `${limit}`,
      skip: "0"
    }).toString();

    setSearchParams(params);
  };

  const handleOpenCategories = async () => {
    dialogRef.current?.showModal();

    const tagsModal = dialogRef.current?.querySelectorAll("li");

    if (!tagsModal) return;

    const tagsParams = searchParams.get("tags")?.split("-") || [];

    if (!tagsParams.length) return;

    tagsModal.forEach((tag) => {
      const tagName = tag.textContent?.toLocaleLowerCase().trim() || "";
      const isSelected = tagsParams.includes(tagName);
      if (isSelected) {
        tag.setAttribute("selected", "true");
        tag.classList.add("bg-yellow-200");
      } else {
        tag.removeAttribute("selected");
        tag.classList.remove("bg-yellow-200");
      }
    });
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

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (user?.id) {
      const li = event.currentTarget.closest("li");
      const a = li?.querySelector("a") as HTMLAnchorElement;
      const advertId = a.href.split("-")[1];
      const advert = adverts.list.find((advert) => advert.id === advertId);
      const isFavorite = !!advert?.favorites.find(
        (owner) => owner.id === user.id
      );

      dispatch(toogleFavorite(isFavorite, advertId));
      return;
    }

    navigate("/login");
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
              className="flex w-full flex-col items-center justify-center gap-16 sm:mx-auto sm:w-7/8 md:mx-auto md:w-3/4"
              onSubmit={handleFiltersSubmit}
            >
              <div className="flex w-full flex-col gap-4">
                {/* Filter by price */}
                <div className="flex w-full flex-col gap-2">
                  <p className="leading-7 font-bold">Price</p>
                  <div className="flex w-full flex-row gap-2">
                    <input
                      className="h-10 w-1/2 rounded-lg border border-gray-400 p-1.5 px-4 text-xs placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none"
                      type="number"
                      name="min"
                      min={0}
                      placeholder="Min"
                    />
                    <input
                      className="h-10 w-1/2 rounded-lg border border-gray-400 p-1.5 px-4 text-xs placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none"
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
                      className="h-10 w-full rounded-lg border border-gray-400 p-1.5 px-4 text-xs placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none sm:flex sm:flex-grow md:w-100"
                      type="text"
                      name="owner"
                      placeholder="Example: guille"
                    />
                  </div>
                </div>

                {/* Filter by category */}
                <div className="flex w-full flex-col gap-2">
                  <p className="leading-7 font-bold">Categories</p>
                  <div className="flex w-full flex-row gap-2">
                    <input
                      className="flex h-10 w-full flex-row items-center justify-between rounded-lg border border-gray-400 p-1.5 px-4 text-xs placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none"
                      type="text"
                      name="categories"
                      placeholder="Select categories"
                      value={categories.join("-")}
                      readOnly
                    />
                    <button
                      className="cursor-pointer rounded-lg border border-gray-400 px-5 py-1.5 text-xs text-gray-400 hover:bg-black hover:text-white lg:w-1/5"
                      onClick={handleOpenCategories}
                      type="button"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="h-10 w-full cursor-pointer rounded-lg border border-gray-400 p-1.5 px-4 text-sm text-gray-500 hover:bg-black hover:text-white"
                type="submit"
              >
                Apply
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
        <section className="flex w-full flex-col justify-center gap-1">
          <p className="text-sm leading-10 text-gray-500">Search </p>
          <div className="flex flex-col gap-4 md:flex-row lg:gap-8">
            <form
              className="relative flex w-full"
              onSubmit={handleSearchByName}
            >
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
              className="h-10 w-full cursor-pointer rounded-lg border border-gray-400 p-1.5 px-4 text-xs text-gray-500 placeholder:italic hover:bg-black hover:text-white focus:ring-1 focus:ring-gray-500 focus:outline-none md:w-100"
              type="button"
              onClick={handleOpenFilters}
            >
              Filters
            </button>
          </div>
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
        <section className="flex w-full flex-col justify-between gap-1">
          <p className="text-sm leading-10 text-gray-500">Sort by: </p>
          <div className="flex w-full flex-row items-center justify-between gap-4 lg:gap-8">
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
        <section className="mt-[40px] flex w-full flex-row justify-center">
          <div className="gap flex w-full flex-row gap-4 sm:w-1/2 lg:gap-8">
            <button
              className="h-10 w-1/2 cursor-pointer rounded-lg border border-gray-400 p-1.5 px-4 text-xs text-gray-500 hover:bg-black hover:text-white"
              type="button"
              onClick={handlePrevPage}
            >
              Previous
            </button>
            <button
              className="h-10 w-1/2 cursor-pointer rounded-lg border border-gray-400 p-1.5 px-4 text-xs text-gray-500 hover:bg-black hover:text-white"
              type="button"
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </section>

        {/* List of adverts and limit*/}
        <section className="mb-10 flex w-full flex-col gap-2">
          <div className="flex flex-row-reverse items-center justify-between">
            <div className="relative flex flex-row items-center gap-4">
              <p className="text-xs leading-10 text-gray-500">Display</p>
              <form onSubmit={handleLimit}>
                <input
                  className="absolute top-3 left-10 w-7 appearance-none text-center text-xs font-semibold text-gray-500 placeholder:text-center placeholder:text-xs placeholder:italic [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  name="limit"
                  step={1}
                  min={1}
                  max={10}
                  placeholder="5"
                />
              </form>
              <p className="text-xs leading-10 text-gray-500">
                adverts per page
              </p>
            </div>

            <p className="text-md relative leading-10 font-bold sm:text-lg md:text-xl">
              List of adverts
            </p>
          </div>
          {adverts.list.length === 0 ? (
            <p> No adverts </p>
          ) : (
            <ul className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {adverts.list.map((advert) => (
                <li
                  key={`${advert.name}-${advert.id}`}
                  className="card relative"
                >
                  <Link
                    className="relative flex h-full w-full flex-col gap-2"
                    to={`/adverts/${advert.name}-${advert.id}`}
                  >
                    <div className="flex h-48 items-center justify-center">
                      <img
                        src={advert.image}
                        alt={advert.name}
                        className="h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <h3 className="text-lg leading-10 font-bold capitalize">
                          {advert.name}
                        </h3>
                        <p>
                          {advert.description.split(" ").slice(0, 3).join(" ") +
                            "..."}
                        </p>
                        <p>
                          Price: <strong>{advert.price}€</strong>
                        </p>
                        {/* //TODO esto se puede mejorar */}
                        <p className="absolute top-0 rounded-lg border-black bg-white p-1 text-xs text-black shadow-md">
                          {advert.sale === "sell" ? "For sell" : "To buy"}
                        </p>
                      </div>
                      <div className="">
                        <p className="flex flex-row flex-wrap gap-2">
                          Published by:
                          <Link to={`/adverts/user/${advert.owner?.username}`}>
                            <strong>{advert.owner?.username}</strong>
                          </Link>
                        </p>
                        <button
                          className="absolute top-0 right-0 cursor-pointer"
                          onClick={handleLike}
                        >
                          {user?.id &&
                          advert.favorites.find(
                            (owner) => owner.id === user.id
                          ) ? (
                            <LikeIcon />
                          ) : (
                            <UnlikeIcon />
                          )}
                        </button>
                      </div>
                    </div>
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
