import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../components/icons/Search";
import { useEffect, useState } from "react";
import { Advert } from "../store/state/types";

const HomePage = () => {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const response = await fetch(
          "https://api.wallaclone.keepcoders.duckdns.org/adverts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch adverts");
        }

        const data = await response.json();

        return data.adverts;
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    fetchAdverts().then((data) => {
      setAdverts(data);
    });
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          "https://api.wallaclone.keepcoders.duckdns.org/tags",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }

        const data = await response.json();

        return data.tags;
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    fetchTags().then((data) => {
      setTags(data);
    });
  }, []);

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

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 bg-red-600">
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
        <section className="w-full bg-red-400">
          <p>Categories</p>
          {tags.length === 0 ? (
            <p>No categories</p>
          ) : (
            <ul className="flex gap-4 overflow-x-auto scroll-smooth p-4">
              {tags.map((tag) => (
                <li key={tag.id}>
                  <button onClick={searchByCategory}>{tag.name}</button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Carrousel latest ads for sale */}
        <section className="bg-red-400">
          <p>Lates ads for sale</p>
          {adverts.length === 0 ? (
            <p> No adverts </p>
          ) : (
            <ul className="flex snap-x gap-4 overflow-x-auto scroll-smooth p-4">
              {adverts
                .filter((advert) => advert.sale === "sell")
                .map((advert) => (
                  <li key={`${advert.name}-${advert.id}`} className="">
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

        {/* Carrousel latest ads to buy */}
        <section className="bg-red-400">
          <p>People Are Looking For...</p>
          {adverts.length === 0 ? (
            <p> No adverts </p>
          ) : (
            <ul className="flex snap-x gap-4 overflow-x-auto scroll-smooth p-4">
              {adverts
                .filter((advert) => advert.sale === "buy")
                .map((advert) => (
                  <li key={`${advert.name}-${advert.id}`} className="">
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

export default HomePage;
