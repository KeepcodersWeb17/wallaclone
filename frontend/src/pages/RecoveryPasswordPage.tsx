import { useNavigate } from "react-router-dom";
import { uiFulfilled, uiPending, uiRejected } from "../store/actions/creators";
import { getUi } from "../store/selectors/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";

const RecoveryPasswordPage = () => {
  const { error, loading } = useAppSelector(getUi);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.querySelector(
      'input[type="email"]'
    ) as HTMLInputElement;

    if (!email.value) {
      dispatch(uiRejected(["Please fill all fields"]));
      return;
    }

    try {
      dispatch(uiPending());
      const response = await fetch(
        "https://api.wallaclone.keepcoders.duckdns.org/auth/recovery-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.value
          })
        }
      );

      if (!response.ok) {
        throw new Error("Error recovery password");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      navigate("/");

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
      <h2>Recovery Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="rounded-lg border border-gray-400 px-4 py-2 placeholder:italic"
          type="email"
          placeholder="Enter your email"
        />
        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <p className="text-green-500">Loading...</p>
        ) : (
          <button className="btn btn-primary cursor-pointer">
            Send recovery email
          </button>
        )}
      </form>
    </>
  );
};

export default RecoveryPasswordPage;
