import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../components/icons/Search";
import { useEffect } from "react";
import { Advert, Tag } from "../store/state/types";
import UnlikeIcon from "../components/icons/Unlike";
import { getAdverts, getTags, getUser } from "../store/selectors/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  getAdverts as getAdvertsAction,
  getAllTags as getTagsAction
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

  const searchByCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const tagName = event.currentTarget.textContent?.toLowerCase() || "";

    navigate(`/adverts?tags=${tagName}`);
  };

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (user?.id) {
      navigate(`/adverts/user/${user.id}`);
      return;
    }

    navigate("/login");
  };

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
              <button className="h-10" type="submit">
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
                <li key={tag.id} className="btn">
                  <button className="px-6" onClick={searchByCategory}>
                    {tag.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

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
                    <Link to={`/adverts/user/${advert.owner?.username}`}>
                      Published by: {advert.owner?.username}
                    </Link>
                    <button
                      className="absolute top-6 right-6"
                      onClick={handleLike}
                    >
                      <UnlikeIcon />
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
                    <Link to={`/adverts/user/${advert.owner?.username}`}>
                      Published by: {advert.owner?.username}
                    </Link>
                    <button
                      className="absolute top-6 right-6"
                      onClick={handleLike}
                    >
                      <UnlikeIcon />
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
