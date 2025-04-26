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
    <>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex h-[85vh] w-full flex-col gap-4">
          {/* Search form */}
          <section className="flex w-full flex-grow flex-col items-center justify-center gap-4">
            <h2 className="text-center text-[1.4rem] leading-15 font-bold md:text-2xl lg:text-[2rem]">
              {" "}
              What are you looking for?{" "}
            </h2>
            <div className="flex w-full flex-col items-center justify-center gap-8">
              <form
                className="flex w-full items-center justify-center gap-2"
                onSubmit={searchByAdvertName}
              >
                <input
                  className="h-10 w-full rounded-lg p-1.5 px-4 text-xs shadow-lg shadow-gray-400 placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none md:w-100"
                  type="text"
                  name="advert"
                  id="advert"
                  placeholder="Example: iPhone 14 Pro Max"
                />
              </form>

              {/* Carrousel categories */}
              <div className="flex w-full flex-col gap-2">
                <p className="leading-10 font-bold">Categories</p>
                {tags.length === 0 ? (
                  <p>No categories</p>
                ) : (
                  <ul className="flex flex-row gap-10 overflow-y-auto">
                    {tags.map((tag) => (
                      // TODO refactorizar
                      <li key={tag.id} className="">
                        <button
                          className="btn btn-tag btn-primary cursor-pointer"
                          onClick={searchByCategory}
                        >
                          {tag.name}{" "}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>

          <section className="flex w-full flex-col gap-4">
            {/* <p>Novedades de Wallaclone</p> */}
            <Link to="/adverts?tags=lifestyle">
              <img src="banner-wallaclone-lifestyles.png" alt="banner" />
            </Link>
          </section>
        </div>

        {/* Carrousel favorites ads */}
        {likedAdverts?.length > 0 && (
          <section className="flex w-full flex-col gap-4 bg-red-400">
            <ul className="flex flex-row gap-4 overflow-y-auto">
              {likedAdverts.map((advert) => (
                <li
                  key={`${advert.name}-${advert.id}`}
                  className="card relative"
                >
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
                    </div>
                  </Link>
                  <p>
                    Published by{" "}
                    <Link to={`/adverts/user/${advert.owner?.username}`}>
                      <span>{advert.owner?.username}</span>
                    </Link>
                  </p>
                  <button
                    className="absolute top-6 right-6 cursor-pointer"
                    onClick={handleLike}
                  >
                    {user?.id &&
                    advert.favorites.find((owner) => owner.id === user.id) ? (
                      <LikeIcon />
                    ) : (
                      <UnlikeIcon />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Carrousel latest ads for sale */}
        <section className="flex w-full flex-col gap-2">
          <p className="leading-6 font-bold">Lates ads for sale</p>
          {adverts.length === 0 ? (
            <p> No adverts </p>
          ) : (
            <ul className="card-list">
              {adverts
                .filter((advert) => advert.sale === "sell")
                .map((advert) => (
                  <li
                    key={`${advert.name}-${advert.id}`}
                    className="card relative"
                  >
                    <Link to={`/adverts/${advert.name}-${advert.id}`}>
                      {/* //TODO conviene usar figure? */}
                      <figure className="h-[150px] w-[150px] bg-red-200">
                        <picture className="h-full w-full">
                          <source srcSet={advert.image} type="image/webp" />
                          <source
                            srcSet={advert.image}
                            type="image/jpeg"
                          />{" "}
                          <img
                            src={advert.image}
                            alt={advert.name}
                            className="object-cover"
                          />
                        </picture>
                      </figure>
                      <div>
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
                      </div>
                    </Link>
                    <p>
                      Published by{" "}
                      <Link to={`/adverts/user/${advert.owner?.username}`}>
                        <strong>{advert.owner?.username}</strong>
                      </Link>
                    </p>
                    <button
                      className="absolute top-6 right-6 cursor-pointer"
                      onClick={handleLike}
                    >
                      {user?.id &&
                      advert.favorites.find((owner) => owner.id === user.id) ? (
                        <LikeIcon />
                      ) : (
                        <UnlikeIcon />
                      )}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </section>

        {/* Carrousel latest ads to buy */}
        <section className="flex w-full flex-col gap-2">
          <p className="leading-6 font-bold">People Are Looking For...</p>
          {adverts.length === 0 ? (
            <p> No adverts </p>
          ) : (
            <ul className="card-list">
              {adverts
                .filter((advert) => advert.sale === "buy")
                .map((advert) => (
                  <li
                    key={`${advert.name}-${advert.id}`}
                    className="card relative"
                  >
                    <Link
                      to={`/adverts/${advert.name}-${advert.id}`}
                      className="flex flex-col gap-4"
                    >
                      {/* //TODO conviene usar figure? */}
                      <figure className="h-[150px] w-[150px] rounded-lg bg-red-200">
                        <picture className="h-full w-full">
                          <source srcSet={advert.image} type="image/webp" />
                          <source
                            srcSet={advert.image}
                            type="image/jpeg"
                          />{" "}
                          <img
                            src={advert.image}
                            alt={advert.name}
                            className="rounded-lg object-cover"
                          />
                        </picture>
                      </figure>
                      <div>
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
                      </div>
                    </Link>
                    <p>
                      Published by{" "}
                      <Link to={`/adverts/user/${advert.owner?.username}`}>
                        <strong>{advert.owner?.username}</strong>
                      </Link>
                    </p>
                    <button
                      className="absolute top-6 right-6 cursor-pointer"
                      onClick={handleLike}
                    >
                      {user?.id &&
                      advert.favorites.find((owner) => owner.id === user.id) ? (
                        <LikeIcon />
                      ) : (
                        <UnlikeIcon />
                      )}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

export default HomePage;
