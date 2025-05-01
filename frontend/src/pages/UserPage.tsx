import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getUi, getUser } from "../store/selectors/selectors";
import { User } from "../store/state/types";
import { maskedEmail } from "../lib/maskEmail";
import { deleteUser } from "../store/actions/creators";
import { useState } from "react";

const UserPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser) as User;
  const { error, loading } = useAppSelector(getUi);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setIsModalOpen(false);
    dispatch(deleteUser(navigate));
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Main container */}
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Go back */}
        <nav className="mb-6">
          <Link
            to="/adverts"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            ← Go back
          </Link>
        </nav>

        {/* Heading */}
        <h2 className="mb-1 text-xl font-bold text-black md:text-2xl">
          My profile
        </h2>
        <p className="mb-6 text-sm text-gray-700">
          Member since {user.createdAt?.split("T")[0]}
        </p>

        {/* Profile card */}
        <div className="relative space-y-4 rounded-lg bg-white p-4 shadow md:space-y-6 md:p-6">
          {/* Avatar */}
          <div className="flex items-center justify-center text-xl font-medium text-gray-700">
            <p className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
              {user.username[0].toUpperCase()}
            </p>
          </div>

          {/* Username */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-black sm:text-lg">
              Username
            </p>
            <p className="text-sm text-gray-900 sm:text-lg">{user.username}</p>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-black sm:text-lg">Email</p>
            <p className="text-sm text-gray-900 sm:text-lg">
              {user.email && maskedEmail(user.email)}
            </p>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-black sm:text-lg">
              Password
            </p>
            <p className="text-sm text-gray-900 sm:text-lg">******</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-4">
            <Link
              to={`/users/${user.username}/edit`}
              className="h-10 flex-1 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-gray-500 transition duration-150 hover:bg-black hover:text-white active:scale-95"
            >
              Edit profile
            </Link>
            <button
              onClick={handleDeleteClick}
              className="h-10 flex-1 cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-red-600 hover:bg-black"
            >
              Delete account
            </button>
          </div>

          {/* Feedback */}
          {error?.length && (
            <p className="text-sm text-red-600">{error.join(", ")}</p>
          )}
          {loading && <p className="text-sm text-black">loading...</p>}
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/20 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm account deletion
            </h3>
            <p className="text-sm text-black">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-4">
              <button
                onClick={cancelDelete}
                className="h-10 flex-1 cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-black hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="h-10 flex-1 cursor-pointer rounded-md bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
