import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type State from "../store/state/types";
import { authLogin, authLogout } from "../store/actions/creators";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const isAuth = useSelector((state: State) => !!state.user?.id);
  const persistedUsername = useSelector((state: State) => state.user?.username);

  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { username, password };
    // @ts-expect-error Lo vamos a tipar más adelante
    await dispatch(authLogin(userData)); // este await es necesario para usar navigate luego!
    navigate(location.state?.from ?? "/adverts", { replace: true });
  };

  const handleLogout = () => {
    // @ts-expect-error Lo vamos a tipar más adelante
    dispatch(authLogout());
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {isAuth ? (
        <>
          <h2>Bienvenido {persistedUsername}</h2>{" "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <label htmlFor="">Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default LoginPage;
