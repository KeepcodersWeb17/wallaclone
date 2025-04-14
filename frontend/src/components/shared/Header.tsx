import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type State from "../../store/state/types";
import { useDispatch } from "react-redux";
import { authLogout } from "../../store/actions/creators";

const Header = () => {
  const user = useSelector((state: State) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // @ts-expect-error lo vamos a tipar mas adelante
    await dispatch(authLogout());
    navigate("/login");
  };

  return (
    <header>
      <Link to={"/adverts"}>
        <h1>Wallaclone</h1>
      </Link>
      <nav>
        {user?.username ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            <Link to={`/users/${user?.username}`}>{user?.username}</Link>{" "}
          </>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
