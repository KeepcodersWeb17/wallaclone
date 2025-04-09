import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../store/actions/creators";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const disabledButton = !username || !email || !password || !confirmPassword;

  const dispatch = useDispatch();

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if password and confirm password are the same
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = { username, email, password };

    await dispatch(signup(userData));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleCreateUser}>
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
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div>
          <button type="submit" disabled={disabledButton}>
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default SignupPage;
