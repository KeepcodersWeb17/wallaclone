const UncaughtErrorPage = () => {
  return (
    <section className="mx-auto mt-8 max-w-3xl">
      <h2 className="mb-4 text-center text-4xl font-bold">Ooooops!</h2>
      <p className="mb-6 text-center font-semibold">Something went wrong!</p>
      <div className="sm:flex sm:items-center sm:justify-center sm:gap-x-8">
        <article>
          <h3 className="mb-4 text-center font-semibold">
            Visita el portfolio de Guillermo!
          </h3>
          <a
            href="https://codesthenos.github.io/CODESTHENOS-PORTFOLIO/"
            rel="noopener noreferrer"
            target="_blank"
            className="mx-auto mb-2 block w-fit rounded-2xl border-2 bg-zinc-200 px-3 py-1 font-bold text-zinc-800 uppercase transition-all duration-500 ease-in-out hover:scale-110 hover:bg-zinc-800 hover:text-zinc-200"
          >
            CODESTHENOS
          </a>
        </article>
        <article>
          <h3 className="mb-4 text-center font-semibold">
            Visita el portfolio de Alejandro!
          </h3>
          <a
            href="https://github.com/AlexHervas"
            rel="noopener noreferrer"
            target="_blank"
            className="mx-auto mb-2 block w-fit rounded-2xl border-2 bg-zinc-200 px-3 py-1 font-bold text-zinc-800 uppercase transition-all duration-500 ease-in-out hover:scale-110 hover:bg-zinc-800 hover:text-zinc-200"
          >
            ALEJANDRO
          </a>
        </article>
        <article>
          <h3 className="mb-4 text-center font-semibold">
            Visita el portfolio de Agustin!
          </h3>
          <a
            href="https://github.com/alonsoagustin"
            rel="noopener noreferrer"
            target="_blank"
            className="mx-auto mb-2 block w-fit rounded-2xl border-2 bg-zinc-200 px-3 py-1 font-bold text-zinc-800 uppercase transition-all duration-500 ease-in-out hover:scale-110 hover:bg-zinc-800 hover:text-zinc-200"
          >
            AGUSTIN
          </a>
        </article>
        <article>
          <h3 className="mb-4 text-center font-semibold">Try going home!</h3>
          <a
            href="/"
            className="mx-auto mb-2 block w-fit rounded-2xl border-2 bg-zinc-800 px-3 py-1 font-bold text-zinc-200 uppercase transition-all duration-500 ease-in-out hover:scale-110 hover:bg-zinc-200 hover:text-zinc-800"
          >
            HOME
          </a>
        </article>
      </div>
    </section>
  );
};

export default UncaughtErrorPage;
