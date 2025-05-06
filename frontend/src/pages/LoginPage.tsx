import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { authLogin } from "../store/actions/creators";
import { getUi } from "../store/selectors/selectors";
import InputPassword from "../components/InputPassword";

const LoginPage = () => {
  const { error, loading } = useAppSelector(getUi);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username =
      e.currentTarget.querySelector<HTMLInputElement>("#username")?.value;
    const password =
      e.currentTarget.querySelector<HTMLInputElement>(
        "[name='password']"
      )?.value;

    if (!username || !password) return;

    const userData = { username, password };
    dispatch(authLogin(userData, navigate, location));
  };

  return (
    <div className="grid w-full grid-cols-1 place-items-center">
      <div className="flex w-full max-w-125 flex-col rounded-lg border border-gray-400 p-4 sm:w-2/3">
        <h2 className="mb-5 text-center text-lg leading-10 font-semibold text-gray-500 sm:text-xl">
          Enter your credentials
        </h2>
        <form className="flex w-full flex-col gap-5" onSubmit={handleLogin}>
          <div className="flex flex-col justify-between">
            <input
              className="w-full rounded-lg border border-gray-400 px-4 py-2 placeholder:text-xs placeholder:text-gray-500 placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none sm:placeholder:text-sm"
              type="text"
              name="username"
              id="username"
              minLength={3}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="relative">
              <InputPassword />
            </div>
          </div>
          <div>
            <Link
              className="text-xs text-blue-600 underline hover:text-blue-800 sm:text-sm"
              to="/recovery-password"
            >
              Recover your password
            </Link>
          </div>
          <div className="w-full">
            {error?.length && (
              <p className="text-center text-xs text-red-600 sm:text-sm">
                {error.join(", ")}
              </p>
            )}
            {loading ? (
              <p className="text-center text-xs sm:text-sm">loading...</p>
            ) : (
              <button
                className="w-full transform cursor-pointer rounded-lg border border-gray-400 py-2.5 text-xs text-gray-500 transition duration-150 hover:bg-black hover:text-white active:scale-99 sm:text-sm"
                type="submit"
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
