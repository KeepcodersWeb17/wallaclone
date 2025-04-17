import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../store/store";

const UpdateUserPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // await dispatch(updateUserPassword(newPassword));

    alert("Password updated successfully");

    navigate("/login");
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <h2>Change password</h2>
      <form>
        <div>
          <label htmlFor="newPassword">New password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button type="submit" onSubmit={handleChangePassword}>
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateUserPage;
