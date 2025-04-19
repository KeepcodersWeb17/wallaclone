import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getUi, getUser } from "../store/selectors/selectors";
import { User } from "../store/state/types";
import { maskedEmail } from "../lib/maskEmail";
import { deleteUser } from "../store/actions/creators";

const UserPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser) as User;
  const { error, loading } = useAppSelector(getUi);

  const handleDelete = () => {
    // TODO: reemplazar confirm por un modal
    const removeUser = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!removeUser) return;
    dispatch(deleteUser(navigate));
  };

  return (
    <>
      <nav>
        <Link to={`/adverts`}>Go back</Link>
      </nav>
      <h2>My profile</h2>

      <div>
        <p>Member since {user.createdAt?.split("T")[0]}</p>
      </div>

      <div>
        <p>Username</p>
        <p>{user.username}</p>
      </div>

      <div>
        <p>Email</p>
        <p>{user.email && maskedEmail(user.email)}</p>
      </div>

      <div>
        <p>Password</p>
        <p>******</p>
      </div>

      <div>
        <Link to={`/users/${user.username}/edit`}>Edit profile</Link>
        {error?.length && <p style={{ color: "red" }}>{error.join(", ")}</p>}
        {loading ? (
          <p>loading...</p>
        ) : (
          <button type="button" onClick={handleDelete}>
            Delete account
          </button>
        )}
      </div>
    </>
  );
};

export default UserPage;
