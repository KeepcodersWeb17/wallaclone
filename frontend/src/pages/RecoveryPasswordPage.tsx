const RecoveryPasswordPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // obtener el valor del input
    // fetch a la api para verificar el email y enviar el correo
    // si todo va bien, redirigir a la pagina de login
    // si no, mostrar un mensaje de error
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
        <button className="btn btn-primary cursor-pointer">
          Send recovery email
        </button>
      </form>
    </>
  );
};

export default RecoveryPasswordPage;
