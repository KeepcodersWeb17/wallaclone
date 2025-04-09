// import { useSearchParams } from "react-router-dom";

import { useSelector } from "react-redux";
import State from "../store/state/types";

const AdvertsPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams

  const adverts = useSelector((state: State) => state.adverts);

  return (
    <>
      <h2>Adverts</h2>
      {adverts.length === 0 ? (
        <p>No adverts available.</p>
      ) : (
        <ul>
          {adverts.map((advert) => (
            <li key={advert.id}>
              <h3>{advert.name}</h3>
              <p>{advert.description}</p>
              <p>Price: {advert.price}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AdvertsPage;
