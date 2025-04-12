import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import type State from "../store/state/types";

const UserPage = () => {
  const { username } = useParams();

  const user = useSelector((state: State) => state.user);

  const [openModal, setOpenModal] = useState(false);

  const handleEdit = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSendAEmail = () => {
    // crear logica para enviar un email
    alert("Email sent");
    setOpenModal(false);
  };

  return (
    <>
      <dialog open={openModal}>
        <h3>Change password</h3>
        <p>We will send you an email with a link to change your password.</p>
        <button onClick={handleClose}>Close</button>
        <button onClick={handleSendAEmail}>Send a email</button>
      </dialog>

      {username !== user.username ? (
        <Navigate to={"/404"} />
      ) : (
        <>
          <nav>
            <Link to={`/adverts`}>Go back</Link>
          </nav>
          <h2>My profile</h2>

          <div>
            <div>
              <div>
                <p>Username</p>
                <p>{user.username}</p>
              </div>
              <div>
                <button disabled>Edit</button>
              </div>
            </div>
            <div>
              <p>Email</p>
              <p>a*******@****.com</p>
            </div>
            <div>
              <button disabled>Edit</button>
            </div>
            <div>
              <p>Password</p>
              <p>******</p>
            </div>
            <div>
              <button onClick={handleEdit}>Edit</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserPage;
