import { useNavigate } from "react-router-dom";
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
      <h2 className="text-center">Update user</h2>
      <form
        className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-5"
        onSubmit={handleUpdateUser}
      >
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={username}
            minLength={3}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={email}
            minLength={6}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" minLength={6} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            minLength={6}
          />
        </div>
        <div>
          {error?.length && <p style={{ color: "red" }}>{error.join(", ")}</p>}
          {loading ? <p>loading...</p> : <button type="submit">Update</button>}
        </div>
      </form>
    </>
  );
};

export default UpdateUserPage;
