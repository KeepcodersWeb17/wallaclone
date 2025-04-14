import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import type State from "../store/state/types";
import { deleteUser } from "../store/actions/creators";

const UserPage = () => {
  const { username } = useParams();

  const user = useSelector((state: State) => state.user)!;

  const [isOpenDeleteAccountModal, setIsOpenDeleteAccountModal] =
    useState(false);

  const [isOpenSendAnEmailModal, setIsOpenSendAnEmailModal] = useState(false);

  const dispatch = useDispatch();

  const maskedEmail = (email: string) => {
    const [username, domainWithTLD] = email.split("@");
    const [domain, ...tldParts] = domainWithTLD.split(".");
    const maskedUser = username[0] + "***";
    const maskedDomain = domain[0] + "***";
    const tld = tldParts.join(".");
    return `${maskedUser}@${maskedDomain}.${tld}`;
  };

  const handleEdit = () => {
    setIsOpenSendAnEmailModal(true);
  };

  const handleClose = () => {
    setIsOpenSendAnEmailModal(false);
    setIsOpenDeleteAccountModal(false);
  };

  const handleSendAEmail = () => {
    // crear logica para enviar un email
    alert("Email sent");
    setIsOpenSendAnEmailModal(false);
  };

  const handleDelete = () => {
    setIsOpenDeleteAccountModal(true);
  };

  const handleConfirmDelete = async () => {
    // @ts-expect-error lo vamos a tipar mas adelante
    await dispatch(deleteUser());
    alert("Account deleted");
    setIsOpenDeleteAccountModal(false);
  };

  return (
    <>
      <dialog open={isOpenSendAnEmailModal}>
        <h3>Change password</h3>
        <p>We will send you an email with a link to change your password.</p>
        <button onClick={handleClose}>Close</button>
        <button onClick={handleSendAEmail}>Send a email</button>
      </dialog>

      <dialog open={isOpenDeleteAccountModal}>
        <h3>Delete account</h3>
        <p>Are you sure you want to delete your account?</p>
        <button onClick={handleClose}>Close</button>
        <button onClick={handleConfirmDelete}>Delete</button>
      </dialog>

      {username !== user?.username ? (
        <Navigate to={"/403"} />
      ) : (
        <>
          <nav>
            <Link to={`/adverts`}>Go back</Link>
          </nav>
          <h2>My profile</h2>

          <div>
            <p>Member since {user.createdAt!.split("-")[0]}</p>
          </div>

          <div>
            <div>
              <div>
                <p>Username</p>
                <p>{user?.username}</p>
              </div>
              <div>
                <button disabled>Edit</button>
              </div>
            </div>
            <div>
              <p>Email</p>
              <p>{user?.email && maskedEmail(user?.email)}</p>
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

          <div>
            <button onClick={handleDelete}>Delete account</button>
          </div>
        </>
      )}
    </>
  );
};

export default UserPage;
