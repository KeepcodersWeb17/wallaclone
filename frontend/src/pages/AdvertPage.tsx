import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type State from "../store/state/types";
import { getAdvert } from "../store/actions/creators";

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
