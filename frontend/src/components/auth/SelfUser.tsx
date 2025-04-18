import { Navigate, useParams } from "react-router-dom";
import type { User } from "../../store/state/types";
import { useAppSelector } from "../../store/store";
import { getUser } from "../../store/selectors/selectors";

const SelfUser = ({ children }: { children: React.ReactNode }) => {
  const { username } = useParams();
  const user = useAppSelector(getUser) as User;

  const isSelf = user.username === username;

  return isSelf ? children : <Navigate to="/403" replace />;
};

export default SelfUser;
