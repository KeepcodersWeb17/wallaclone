import { useSelector } from "react-redux";
import State from "../../store/state/types";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector((state: State) => state.user?.id);

  const location = useLocation();

  return isAuth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default RequireAuth;
