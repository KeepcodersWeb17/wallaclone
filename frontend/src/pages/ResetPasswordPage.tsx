import { useNavigate, useParams } from "react-router-dom";
import InputPassword from "../components/InputPassword";
import { useAppDispatch, useAppSelector } from "../store/store";
import { uiFulfilled, uiPending, uiRejected } from "../store/actions/creators";
import { getUi } from "../store/selectors/selectors";

const ResetPasswordPage = () => {
  const { token } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, loading } = useAppSelector(getUi);

  //TODO verificar el token al entrar en la pagina
  // useEffect(() => {
  //   const verifyToken = async () => {
  //     const response = await fetch(
  //       `http://localhost:4000/auth/reset-password/${token}`
  //     );

  // }, [token]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const password =
      event.currentTarget.querySelector<HTMLInputElement>(
        "[name='password']"
      )?.value;

    const confirmPassword = Array.from(
      event.currentTarget.querySelectorAll<HTMLInputElement>(
        "[name='password']"
      )
    )[1]?.value;

    if (!password || !confirmPassword) {
      dispatch(uiRejected(["Please fill all fields"]));
      return;
    }

    if (password !== confirmPassword) {
      dispatch(uiRejected(["Passwords do not match"]));
      return;
    }

    try {
      dispatch(uiPending());
      const response = await fetch(
        `https://api.wallaclone.keepcoders.duckdns.org/auth/reset-password/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            password
          })
        }
      );

      if (!response.ok) {
        throw new Error("Error reseting password");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      navigate("/login");

      dispatch(uiFulfilled());
    } catch (error) {
      if (error instanceof Error) {
        dispatch(uiRejected([error.message]));
        return;
      }
    }
  };
  return (
    <>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <InputPassword />
        </div>
        <div className="relative">
          <InputPassword placeholder="Confirm your password" />
        </div>
        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <p className="text-green-500">Loading...</p>
        ) : (
          <button className="btn btn-primary cursor-pointer">
            Change password
          </button>
        )}
      </form>
    </>
  );
};

export default ResetPasswordPage;
