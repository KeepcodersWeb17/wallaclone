import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { updateUser } from "../store/actions/creators";
import { User } from "../store/state/types";

const UpdateUserPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username, email } = useAppSelector((state) => state.user as User);
  const { error, loading } = useAppSelector((state) => state.ui);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const username =
      e.currentTarget.querySelector<HTMLInputElement>("#username");
    const email = e.currentTarget.querySelector<HTMLInputElement>("#email");
    const password =
      e.currentTarget.querySelector<HTMLInputElement>("#password");
    const confirmPassword =
      e.currentTarget.querySelector<HTMLInputElement>("#confirmPassword");

    if (!username || !email || !password || !confirmPassword) return;

    const userData = {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    };

    await dispatch(updateUser(userData, navigate));
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
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email" defaultValue={email} />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
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
