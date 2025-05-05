import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { createUser } from "../store/actions/creators";
import InputPassword from "../components/InputPassword";

const SignupPage = () => {
  const { error, loading } = useAppSelector((state) => state.ui);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

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
    const confirmPassword =
      e.currentTarget.querySelector<HTMLInputElement>(
        "#confirmPassword"
      )?.value;

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
              className="h-10 w-full rounded-lg border border-gray-400 p-1 px-4 placeholder:text-xs placeholder:text-gray-500 placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none sm:placeholder:text-sm"
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
              className="h-10 w-full rounded-lg border border-gray-400 p-1 px-4 placeholder:text-xs placeholder:text-gray-500 placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none sm:placeholder:text-sm"
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
            {error?.length && (
              <p style={{ color: "red" }}>{error.join(", ")}</p>
            )}
            {loading ? (
              <p className="text-center text-xs sm:text-sm">loading...</p>
            ) : (
              <button
                className="h-10 w-full transform cursor-pointer rounded-lg border border-gray-400 text-xs text-gray-500 transition duration-150 hover:bg-black hover:text-white active:scale-99 sm:text-sm"
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
