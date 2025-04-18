import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getUser } from "../../store/selectors/selectors";
import { authLogout } from "../../store/actions/creators";
import UserIcon from "../icons/User";

const Header = () => {
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authLogout(navigate));
  };
  return (
    <header className="fixed top-0 w-full bg-white text-gray-800 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-2">
        <div>
          <Link to={"/adverts"}>
            <h1>Wallaclone</h1>
          </Link>
        </div>
        <div>
          {user?.username && (
            <div className="relative flex items-center text-left">
              <button className="text-black transition-all duration-1000 hover:scale-103 hover:text-gray-700">
                <UserIcon />
              </button>
            </div>
          )}
          <div className="absolute right-0 mt-2 flex flex-col rounded bg-white py-1 shadow-lg ring-1 ring-black">
            <nav className="flex flex-col space-x-8">
              <Link
                to={"/signup"}
                className="block w-full px-4 py-2 text-center text-sm hover:bg-gray-100"
                state={{ from: location.pathname }}
                replace
              >
                Sign up
              </Link>
              <Link
                to={`/users/${user?.username}`}
                className="block w-full px-4 py-2 text-center text-sm hover:bg-gray-100"
              >
                My profile
              </Link>
              <Link
                to={`/adverts/user/${user?.username}`}
                className="block w-full px-4 py-2 text-center text-sm hover:bg-gray-100"
              >
                My Adverts
              </Link>
              <Link
                to={`/adverts/favorites/${user?.username}`}
                className="block w-full px-4 py-2 text-center text-sm hover:bg-gray-100"
              >
                Favorites
              </Link>
              <button
                onClick={handleLogout}
                className="block cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
