import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import type { Advert, User } from "../../store/state/types";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAdvert, getUser } from "../../store/selectors/selectors";
import { getAdvert as getAdvertAction } from "../../store/actions/creators";

const IsOwner = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const { advert } = useParams();
  const advertId = advert?.split("-")[1] || "";

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser) as User;
  const advertDetails = useAppSelector(getAdvert(advertId)) as Advert;

  const isOwner = user.id === advertDetails?.owner.id;

  useEffect(() => {
    if (!advertId) {
      navigate("/404");
      return;
    }
    dispatch(getAdvertAction(advertId));
  }, [dispatch, navigate, advertId]);

  if (!advertDetails) {
    return <Navigate to={`/adverts/update/${advert}`} />;
  }

  if (advertDetails && !isOwner) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default IsOwner;
