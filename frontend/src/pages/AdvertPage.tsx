import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import State from "../store/state/types";

const AdvertPage = () => {
  const adverts = useSelector((state: State) => state.adverts);

  const { advert } = useParams();

  const advertId = advert ? advert.split("-")[1] : null;

  if (!advertId) {
    return <p>Advert not found.</p>;
  }

  const advertDetails = adverts.find((advert) => advert.id === advertId);

  if (!advertDetails) {
    return <p>Advert not found.</p>;
  }

  return (
    <>
      <h2>{advertDetails.name}</h2>
    </>
  );
};

export default AdvertPage;
