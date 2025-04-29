import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Advert, Tag } from "../store/state/types";
// import SearchIcon from "../components/icons/Search";
import UnlikeIcon from "../components/icons/Unlike";
import LikeIcon from "../components/icons/Like";
import { getAdverts, getTags, getUser } from "../store/selectors/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  getAdverts as getAdvertsAction,
  getAllTags as getTagsAction,
  toogleFavorite
} from "../store/actions/creators";

const HomePage = () => {
  const user = useAppSelector(getUser);
  const adverts = useAppSelector(getAdverts) as Advert[];
  const tags = useAppSelector(getTags) as Tag[];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAdvertsAction(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTagsAction());
  }, [dispatch]);

  const searchByAdvertName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const advertName = event.currentTarget.advert.value;

    if (!advertName) {
      navigate("/adverts");
      return;
    }

    navigate(`/adverts?name=${advertName}`);
  };

  const searchByCategory = (
    event: React.MouseEvent<HTMLLIElement & HTMLButtonElement>
  ) => {
    const tagName = event.currentTarget.textContent?.toLowerCase() || "";

    navigate(`/adverts?tags=${tagName}`);
  };

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (user?.id) {
      const li = event.currentTarget.closest("li");
      const a = li?.querySelector("a") as HTMLAnchorElement;
      const advertId = a.href.split("-")[1];
      const advert = adverts.find((advert) => advert.id === advertId);
      const isFavorite = !!advert?.favorites.find(
        (owner) => owner.id === user.id
      );

      dispatch(toogleFavorite(isFavorite, advertId));
      return;
    }

    navigate("/login");
  };

  const [likedAdverts, setLikedAdverts] = useState<Advert[]>([]);

  //   TODO refactorizar
  useEffect(() => {
    if (!user?.id) return;

    const fetchUserFavorites = async () => {
      try {
        const response = await fetch(
          `https://api.wallaclone.keepcoders.duckdns.org/adverts?favorites=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching liked adverts");
        }

        const data = await response.json();

        setLikedAdverts(data.adverts);
      } catch (error) {
        console.error("Error fetching liked adverts:", error);
      }
    };

    fetchUserFavorites();
  }, [user?.id, adverts]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <div className="flex h-[85vh] w-full flex-col gap-4">
        {/* Search form */}
        <section className="flex w-full flex-grow flex-col items-center justify-center gap-4">
          <h2 className="text-xl leading-15 font-bold sm:text-2xl md:text-3xl">
            {" "}
            What are you looking for?{" "}
          </h2>
          <div className="flex w-full flex-col items-center justify-center gap-8">
            <form
              className="flex w-full items-center justify-center gap-2"
              onSubmit={searchByAdvertName}
            >
              <input
                className="h-10 w-full rounded-lg border border-gray-400 p-1.5 px-4 text-xs placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none md:w-100"
                type="text"
                name="advert"
                id="advert"
                placeholder="Example: iPhone 14 Pro Max"
              />
            </form>

            {/* Carrousel categories */}
            <div className="flex w-full flex-col gap-2">
              <p className="text-md leading-10 font-bold sm:text-lg md:text-xl">
                Categories
              </p>
              {tags.length === 0 ? (
                <p>No categories</p>
              ) : (
                <ul className="flex flex-row gap-10 overflow-y-auto">
                  {tags.map((tag) => (
                    // TODO refactorizar
                    <li key={tag.id} className="flex flex-grow flex-row">
                      <button
                        className="flex h-10 flex-grow transform cursor-pointer items-center justify-center rounded-lg border border-gray-400 px-5 py-1.5 text-xs text-gray-500 transition duration-150 hover:bg-black hover:text-white active:scale-95 active:bg-gray-900 sm:flex-grow"
                        onClick={searchByCategory}
                      >
                        {tag.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Banner */}
        <section
          id="banner"
          className="flex h-20 w-full flex-col items-center justify-center gap-4 bg-black"
        >
          {/* <p>Novedades de Wallaclone</p> */}
          <Link className="w-full" to="/adverts?tags=lifestyle">
            <p className="text-center text-white">Live better, shop smarter</p>
            <p className="text-center text-white">
              Find your lifestyle must-haves
            </p>
          </Link>
        </section>
      </div>

      {/* Carrousel favorites ads */}
      {user?.id && likedAdverts?.length > 0 && (
        <section className="flex w-full flex-col gap-2">
          <p className="text-md leading-10 font-bold sm:text-lg md:text-xl">
            Your saved ads
          </p>
          <ul className="card-list">
            {likedAdverts.map((advert) => (
              <li
                key={`${advert.name}-${advert.id}`}
                className="card relative min-w-70 transform transition duration-150 active:scale-95"
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
                  <div className="flex flex-col">
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
                      <p>
                        Published by:{" "}
                        <Link to={`/adverts/user/${advert.owner?.username}`}>
                          <strong>{advert.owner.username}</strong>
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
        </section>
      )}

      {/* Carrousel latest ads for sale */}
      <section className="flex w-full flex-col gap-2">
        <p className="text-md leading-10 font-bold sm:text-lg md:text-xl">
          Lates ads for sale
        </p>
        {adverts.length === 0 ? (
          <p> No adverts </p>
        ) : (
          <ul className="card-list">
            {adverts
              .filter((advert) => advert.sale === "sell")
              .map((advert) => (
                <li
                  key={`${advert.name}-${advert.id}`}
                  className="card relative min-w-70 transform transition duration-150 active:scale-95"
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
                    <div className="flex flex-col">
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
                        <p>
                          Published by:{" "}
                          <Link to={`/adverts/user/${advert.owner?.username}`}>
                            <strong>{advert.owner.username}</strong>
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

      {/* Carrousel latest ads to buy */}
      <section className="flex w-full flex-col gap-2">
        <p className="text-md leading-10 font-bold sm:text-lg md:text-xl">
          People Are Looking For...
        </p>
        {adverts.length === 0 ? (
          <p> No adverts </p>
        ) : (
          <ul className="card-list">
            {adverts
              .filter((advert) => advert.sale === "buy")
              .map((advert) => (
                <li
                  key={`${advert.name}-${advert.id}`}
                  className="card relative min-w-70 transform transition duration-150 active:scale-95"
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
                    <div className="flex flex-col">
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
                        <p>
                          Published by:{" "}
                          <Link to={`/adverts/user/${advert.owner?.username}`}>
                            <strong>{advert.owner.username}</strong>
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
  );
};

export default HomePage;
