import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { authLogin } from "../store/actions/creators";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = e.currentTarget.querySelector(
      "#username"
    ) as HTMLInputElement;
    const password = e.currentTarget.querySelector(
      "#password"
    ) as HTMLInputElement;

    const userData = { username: username.value, password: password.value };
    await dispatch(authLogin(userData)); // este await es necesario para usar navigate luego!
    navigate(location.state?.from ?? "/adverts", { replace: true });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="">Password: </label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
