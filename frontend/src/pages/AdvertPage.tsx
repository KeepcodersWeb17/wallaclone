import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import State from "../store/state/types";
import { useDispatch } from "react-redux";
import { getAdvert } from "../store/actions/creators";
import { useEffect } from "react";

const AdvertPage = () => {
  const dispatch = useDispatch();

  const { advert } = useParams();

  const advertId = advert ? advert.split("-")[1] : null;

  useEffect(() => {
    if (advertId)
      // @ts-expect-error lo vamos a tipar mas adelante
      dispatch(getAdvert(advertId));
  }, [advertId, dispatch]);

  const advertDetails = useSelector((state: State) => state.advert);

  if (!advertDetails) {
    return <p>Advert not found</p>;
  }

  return (
    <>
      {!advertId ? (
        <p>Advert not found</p>
      ) : (
        <h2>
          {advertDetails.name} On: {advertDetails.sale}
        </h2>
      )}
    </>
  );
};

export default AdvertPage;
