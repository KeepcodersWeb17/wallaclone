import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { authLogin } from "../store/actions/creators";
import { getUi } from "../store/selectors/selectors";

const LoginPage = () => {
  const { error, loading } = useAppSelector(getUi);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = e.currentTarget.querySelector(
      "#username"
    ) as HTMLInputElement;
    const password = e.currentTarget.querySelector(
      "#password"
    ) as HTMLInputElement;

    const userData = { username: username.value, password: password.value };
    dispatch(authLogin(userData, navigate, location));
  };

  return (
    <>
      <h2 className="text-center">Login</h2>
      <form
        className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-5"
        onSubmit={handleLogin}
      >
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            minLength={3}
            required
          />
        </div>
        <div>
          <label htmlFor="">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            minLength={6}
            required
          />
        </div>
        <div>
          {error?.length && <p style={{ color: "red" }}>{error.join(", ")}</p>}
          {loading ? <p>loading...</p> : <button type="submit">Login</button>}
        </div>
      </form>
    </>
  );
};

export default LoginPage;
