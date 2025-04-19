import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { createUser } from "../store/actions/creators";

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
      e.currentTarget.querySelector<HTMLInputElement>("#password")?.value;
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
    <>
      <h2 className="text-center">Signup</h2>
      <form
        className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-5"
        onSubmit={handleCreateUser}
      >
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email" />
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
          {loading ? <p>loading...</p> : <button type="submit">Create</button>}
        </div>
      </form>
    </>
  );
};

export default SignupPage;
