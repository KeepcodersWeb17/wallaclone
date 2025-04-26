import { Link, useNavigate } from "react-router-dom";
import type { User, UserUpdate } from "../store/state/types";
import { useAppDispatch, useAppSelector } from "../store/store";
import { updateUser } from "../store/actions/creators";
import { getUi, getUser } from "../store/selectors/selectors";

const UpdateUserPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username, email } = useAppSelector(getUser) as User;
  const { error, loading } = useAppSelector(getUi);

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();

    const username =
      e.currentTarget.querySelector<HTMLInputElement>("#username");
    const email = e.currentTarget.querySelector<HTMLInputElement>("#email");
    const password =
      e.currentTarget.querySelector<HTMLInputElement>("#password");
    const confirmPassword =
      e.currentTarget.querySelector<HTMLInputElement>("#confirmPassword");

    const userData: UserUpdate = {};

    if (username && username.value) {
      userData.username = username.value;
    }

    if (email && email.value) {
      userData.email = email.value;
    }

    if (password && password.value) {
      userData.password = password.value;
    }

    if (confirmPassword && confirmPassword.value) {
      userData.confirmPassword = confirmPassword.value;
    }

    dispatch(updateUser(userData, navigate));
  };

  return (
    <>
      <div className="md:mx-auto md:max-w-4xl md:px-6">
        <nav className="mb-6">
          <Link
            to={`/users/${username}`}
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            ← Go back
          </Link>
        </nav>

        <h2 className="mb-6 text-xl font-bold text-gray-900 md:text-2xl">
          Update user
        </h2>

        <form
          onSubmit={handleUpdateUser}
          className="space-y-6 rounded-lg bg-white p-4 shadow md:p-6"
        >
          {/* Username */}
          <div className="space-y-1">
            <label htmlFor="username" className="text-sm text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={username}
              minLength={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={email}
              minLength={6}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              minLength={6}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-sm text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              minLength={6}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>

          {/* Feedback */}
          {error?.length && (
            <p className="text-sm text-red-600">{error.join(", ")}</p>
          )}
          {loading && <p className="text-sm text-gray-700">loading...</p>}

          {/* Submit */}
          {!loading && (
            <button
              type="submit"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-center text-sm font-medium hover:bg-gray-50 md:inline-block md:w-auto"
            >
              Update
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default UpdateUserPage;
