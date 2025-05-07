import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { createUser } from "../store/actions/creators";
import InputPassword from "../components/InputPassword";
import { getUser } from "../store/selectors/selectors";
import { useEffect } from "react";

const SignupPage = () => {
  const user = useAppSelector(getUser);
  const { loading } = useAppSelector((state) => state.ui);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username =
      e.currentTarget.querySelector<HTMLInputElement>("#username")?.value;
    const email =
      e.currentTarget.querySelector<HTMLInputElement>("#email")?.value;
    const password =
      e.currentTarget.querySelector<HTMLInputElement>(
        "[name='password']"
      )?.value;
    const confirmPassword = Array.from(
      e.currentTarget.querySelectorAll<HTMLInputElement>("[name='password']")
    )[1]?.value;

    if (!username || !email || !password || !confirmPassword) return;

    const userData = {
      username,
      email,
      password,
      confirmPassword
    };

    dispatch(createUser(userData, navigate, location));
  };

  return (
    <div className="grid w-full grid-cols-1 place-items-center">
      <div className="flex w-full max-w-125 flex-col rounded-lg border border-gray-400 p-4 sm:w-2/3">
        <h2 className="mb-5 text-center text-lg leading-10 font-semibold text-gray-500 sm:text-xl">
          Create your account
        </h2>
        <form
          className="flex w-full flex-col gap-5"
          onSubmit={handleCreateUser}
        >
          <div className="flex flex-col justify-between">
            <input
              className="w-full rounded-lg border border-gray-400 px-4 py-2 placeholder:text-xs placeholder:text-gray-500 placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none sm:placeholder:text-sm"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              required
              minLength={3}
            />
          </div>
          <div className="flex flex-col justify-between">
            <input
              className="w-full rounded-lg border border-gray-400 px-4 py-2 placeholder:text-xs placeholder:text-gray-500 placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none sm:placeholder:text-sm"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="relative flex flex-col justify-between">
            <InputPassword />
          </div>
          <div className="relative flex flex-col justify-between">
            <InputPassword placeholder="Confirm Password" />
          </div>
          <div className="mt-5 w-full">
            {loading ? (
              <p className="w-full transform cursor-pointer rounded-lg border border-gray-400 bg-black py-2.5 text-center text-xs text-white transition duration-150 active:scale-99 sm:text-sm">
                Loading...
              </p>
            ) : (
              <button
                className="w-full transform cursor-pointer rounded-lg border border-gray-400 py-2.5 text-xs text-gray-500 transition duration-150 hover:bg-black hover:text-white active:scale-99 sm:text-sm"
                type="submit"
              >
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
