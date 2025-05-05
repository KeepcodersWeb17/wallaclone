import InputPassword from "../components/InputPassword";

const ResetPasswordPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // obtener el valor del input
    // verificar que las contraseñas coincidan
    // fetch a la api para verificar el token y actualizar la contraseña
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

        <button className="btn btn-primary cursor-pointer">
          Change password
        </button>
      </form>
    </>
  );
};

export default ResetPasswordPage;
