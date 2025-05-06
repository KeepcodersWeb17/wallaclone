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
  //       `https://api.wallaclone.keepcoders.duckdns.org/auth/reset-password/${token}`
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
      <div className="grid w-full grid-cols-1 place-items-center">
        <div className="flex w-full max-w-125 flex-col rounded-lg border border-gray-400 p-4 sm:w-2/3">
          <h2 className="mb-5 text-center text-lg leading-10 font-semibold text-gray-500 sm:text-xl">
            Reset your password
          </h2>

          <form
            className="flex flex-grow flex-col gap-5 px-4 py-2"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <InputPassword />
            </div>
            <div className="relative">
              <InputPassword placeholder="Confirm your password" />
            </div>
            {error && (
              <p className="text-center text-xs text-red-600 sm:text-sm">
                {error}
              </p>
            )}

            {loading ? (
              <p className="text-center text-xs sm:text-sm">Loading...</p>
            ) : (
              <button className="w-full transform cursor-pointer rounded-lg border border-gray-400 py-2.5 text-xs text-gray-500 transition duration-150 hover:bg-black hover:text-white active:scale-99 sm:text-sm">
                Change password
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
