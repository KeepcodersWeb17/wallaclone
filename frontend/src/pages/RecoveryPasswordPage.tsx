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
        "http://localhost:4000/auth/recovery-password",
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
      <div className="grid w-full grid-cols-1 place-items-center">
        <div className="flex w-full max-w-125 flex-col rounded-lg border border-gray-400 p-4 sm:w-2/3">
          <h2 className="mb-5 text-center text-lg leading-10 font-semibold text-gray-500 sm:text-xl">
            Recovery Password
          </h2>
          <p className="mb-2 px-4 text-xs text-gray-500 sm:text-sm">
            Enter your email and we will send you a link to reset your password.
          </p>
          <form
            className="flex flex-grow flex-col gap-5 px-4 py-2"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full rounded-lg border border-gray-400 px-4 py-2 placeholder:text-xs placeholder:text-gray-500 placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none sm:placeholder:text-sm"
              type="email"
              placeholder="Enter your email"
            />
            {error && (
              <p className="text-center text-xs text-red-600 sm:text-sm">
                {error}
              </p>
            )}

            {loading ? (
              <p className="text-center text-xs sm:text-sm">Loading...</p>
            ) : (
              <button
                type="submit"
                className="w-full transform cursor-pointer rounded-lg border border-gray-400 py-2.5 text-xs text-gray-500 transition duration-150 hover:bg-black hover:text-white active:scale-99 sm:text-sm"
              >
                Send email
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default RecoveryPasswordPage;
