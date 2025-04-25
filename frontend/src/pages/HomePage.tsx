import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Advert, Tag } from "../store/state/types";
import SearchIcon from "../components/icons/Search";
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
      <div className="flex flex-col items-center justify-center gap-4 bg-red-600">
        {/* Search form */}
        <section className="w-full bg-red-400">
          <h2 className="text-center"> What are you looking for? </h2>
          <div>
            <form
              className="flex items-center justify-center gap-2"
              onSubmit={searchByAdvertName}
            >
              <input
                className="border"
                type="text"
                name="advert"
                id="advert"
                placeholder="Search..."
              />
              <button className="h-10 cursor-pointer" type="submit">
                <SearchIcon />
              </button>
            </form>
          </div>
        </section>

        {/* Carrousel categories */}
        <section className="flex w-full flex-col gap-4 bg-red-400">
          <p>Categories</p>
          {tags.length === 0 ? (
            <p>No categories</p>
          ) : (
            <ul className="flex flex-row gap-4 overflow-y-auto">
              {tags.map((tag) => (
                <li
                  key={tag.id}
                  className="btn cursor-pointer"
                  onClick={searchByCategory}
                >
                  {/* {tag.name} */}
                  <button
                    className="cursor-pointer px-6"
                    onClick={searchByCategory}
                  >
                    {tag.name}{" "}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

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
        <section className="flex w-full flex-col gap-4 bg-red-400">
          <p>Lates ads for sale</p>
          {adverts.length === 0 ? (
            <p> No adverts </p>
          ) : (
            <ul className="flex flex-row gap-4 overflow-y-auto">
              {adverts
                .filter((advert) => advert.sale === "sell")
                .map((advert) => (
                  <li
                    key={`${advert.name}-${advert.id}`}
                    className="card relative"
                  >
                    <Link to={`/adverts/${advert.name}-${advert.id}`}>
                      {/* //TODO conviene usar figure? */}
                      <figure>
                        <picture>
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
          )}
        </section>

        {/* Carrousel latest ads to buy */}
        <section className="flex w-full flex-col gap-4 bg-red-400">
          <p>People Are Looking For...</p>
          {adverts.length === 0 ? (
            <p> No adverts </p>
          ) : (
            <ul className="flex flex-row gap-4 overflow-y-auto">
              {adverts
                .filter((advert) => advert.sale === "buy")
                .map((advert) => (
                  <li
                    key={`${advert.name}-${advert.id}`}
                    className="card relative"
                  >
                    <Link to={`/adverts/${advert.name}-${advert.id}`}>
                      {/* //TODO conviene usar figure? */}
                      <figure>
                        <picture>
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
          )}
        </section>
      </div>
    </>
  );
};

export default HomePage;
