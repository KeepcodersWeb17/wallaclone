import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getUser } from "../../store/selectors/selectors";
import { authLogout } from "../../store/actions/creators";
import UserIcon from "../icons/User";
import CloseIcon from "../icons/Close";
import { useState } from "react";

const Header = () => {
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    closeMenu();
    navigate("/");
    dispatch(authLogout());
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* menu */}
      {/* cambiamos etiqueta dialog por etiqueta div para poder mejorar la UI */}
      {/* la etiqueta dialog tiene un elemento backdrop que evita que el elemento dialog ocupe el 100% */}
      {isMenuOpen && (
        <div
          id="menu"
          className="fixed z-300 flex h-dvh w-dvw flex-col gap-5 bg-gray-300"
        >
          <div className="flex w-full items-center justify-between pt-1 pr-4 pb-1 pl-4 shadow-sm sm:pt-2 sm:pb-2">
            <h3 className="text-xl leading-10 font-bold">Menu</h3>
            <button className="cursor-pointer" onClick={closeMenu}>
              <CloseIcon />
            </button>
          </div>
          <ul className="flex flex-col gap-7 p-4">
            <li onClick={closeMenu} className="flex w-full flex-row">
              <Link
                to={`/users/${user?.username}`}
                className="w-full cursor-pointer text-center text-xl leading-10 sm:hover:bg-gray-100"
              >
                My Profile
              </Link>
            </li>
            <li onClick={closeMenu} className="flex w-full flex-row">
              <Link
                to={`/adverts/new`}
                className="w-full cursor-pointer text-center text-xl leading-10 sm:hover:bg-gray-100"
              >
                New Advert
              </Link>
            </li>
            <li onClick={closeMenu} className="flex w-full flex-row">
              <Link
                to={`/adverts/user/${user?.username}`}
                className="w-full cursor-pointer text-center text-xl leading-10 sm:hover:bg-gray-100"
              >
                My Adverts
              </Link>
            </li>
            <li onClick={closeMenu} className="flex w-full flex-row">
              <Link
                to={`/adverts/favorites/${user?.username}`}
                className="w-full cursor-pointer text-center text-xl leading-10 sm:hover:bg-gray-100"
              >
                My Favorites
              </Link>
            </li>
            <li onClick={closeMenu} className="flex w-full flex-row">
              <Link
                to="/my-chats"
                className="w-full cursor-pointer text-center text-xl leading-10 sm:hover:bg-gray-100"
              >
                My Chats
              </Link>
            </li>
            <li className="flex w-full flex-row">
              <button
                onClick={handleLogout}
                className="w-full cursor-pointer text-center text-xl leading-10 sm:hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      <header className="flex w-full flex-row items-center justify-between bg-gray-300 pt-1 pr-4 pb-1 pl-4 shadow-sm sm:pt-2 sm:pb-2">
        <div>
          <Link to={"/"} state={{ from: location.pathname }} replace>
            <h1 className="text-md leading-10 font-bold sm:text-lg md:text-xl">
              Wallaclone
            </h1>
          </Link>
        </div>

        <nav>
          {user?.username ? (
            <ul>
              <li className="flex items-center">
                <button onClick={openMenu} className="cursor-pointer">
                  <UserIcon />
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center justify-around gap-4">
              <Link
                className=""
                to={"/signup"}
                state={{ from: location.pathname }}
                replace
              >
                <li>
                  <button className="cursor-pointer rounded-lg border border-black px-2 py-1 text-xs text-black transition duration-150 hover:bg-black hover:text-white active:scale-95 sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2">
                    Sign up
                  </button>
                </li>
              </Link>
              <Link to={"/login"} state={{ from: location.pathname }} replace>
                <li>
                  <button className="cursor-pointer rounded-lg border border-black px-2 py-1 text-xs text-black transition duration-150 hover:bg-black hover:text-white active:scale-95 sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2">
                    Log in
                  </button>
                </li>
              </Link>
            </ul>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;

{
  /* <Link
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
              </button> */
}
