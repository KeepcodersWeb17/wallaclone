import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { getIsLogged } from "../../store/selectors/selectors";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useAppSelector(getIsLogged);

  const location = useLocation();

  return isAuth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default RequireAuth;
