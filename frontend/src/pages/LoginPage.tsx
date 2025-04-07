import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type State from "../store/state/types";
import { authLogin, authLogout } from "../store/actions/creators";

const LoginPage = () => {
  const isAuth = useSelector((state: State) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = { username, password };
    await dispatch(authLogin(credentials));
  };

  const handleLogout = async () => {
    await dispatch(authLogout());
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
          <h2>Bienvenido {username}</h2>{" "}
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
