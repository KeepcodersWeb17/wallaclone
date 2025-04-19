import { Navigate, useParams } from "react-router-dom";
import type { Advert, User } from "../../store/state/types";
import { useAppSelector } from "../../store/store";
import { getAdvert, getUser } from "../../store/selectors/selectors";

const IsOwner = ({ children }: { children: React.ReactNode }) => {
  const { advert } = useParams();
  const advertId = advert?.split("-")[1] || "";
  const user = useAppSelector(getUser) as User;
  const advertDetails = useAppSelector(getAdvert(advertId)) as Advert;

  const isOwner = user.id === advertDetails?.owner.id;

  return isOwner ? children : <Navigate to="/403" replace />;
};

export default IsOwner;
