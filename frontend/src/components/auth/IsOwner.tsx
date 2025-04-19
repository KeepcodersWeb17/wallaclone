import { Navigate } from "react-router-dom";
import type { Advert, User } from "../../store/state/types";
import { useAppSelector } from "../../store/store";
import { getAdvert, getUser } from "../../store/selectors/selectors";

const IsOwner = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(getUser) as User;
  const advert = useAppSelector(getAdvert) as Advert;

  const isOwner = user.id === advert?.owner.id;

  return isOwner ? children : <Navigate to="/403" replace />;
};

export default IsOwner;
