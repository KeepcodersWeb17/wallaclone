import { Link } from "react-router-dom";
import SearchIcon from "../components/icons/Search";
import { useEffect, useState } from "react";
import { Advert } from "../store/state/types";

const HomePage = () => {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const response = await fetch("http://localhost:4000/adverts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

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
        const response = await fetch("http://localhost:4000/tags", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  /*
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
  */

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-center"> What are you looking for? </h2>
        <div>
          <form className="flex gap-2" onSubmit={handleSubmit}>
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
      </div>

      {/* Carrousel categories */}
      <div>
        <p>Categories</p>
        {tags.length === 0 ? (
          <p>No categories</p>
        ) : (
          <ul className="flex gap-4 overflow-x-auto scroll-smooth p-4">
            {tags.map((tag) => (
              <li key={tag.id}>
                <Link to={`/adverts/${tag.name}`}>{tag.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Carrousel latest ads for sale */}
      <div>
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
      </div>

      {/* Carrousel latest ads to buy */}
      <div>
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
      </div>
    </>
  );
};

export default HomePage;
