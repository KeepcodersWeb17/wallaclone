// import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import State from "../store/state/types";
import { Link } from "react-router-dom";
import { getAdverts } from "../store/actions/creators";
import { useEffect } from "react";

const AdvertsPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdverts = async () => {
      await dispatch(getAdverts());
    };
    fetchAdverts();
  }, []);

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
              <Link to={`/adverts/${advert.name}-${advert.id}`}>
                <div>
                  <img src={advert.image} alt={advert.name} />
                </div>
                <div>
                  <h3>{advert.name}</h3>
                  <p>{advert.description}</p>
                  <p>Price: {advert.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AdvertsPage;
