const getUser = async () => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/users",
    {
      credentials: "include"
    }
  ).then((res) => res.json());

  if (response.error) return null;

  return response;
};

const getPreloadedState = async () => {
  const user = await getUser();

  return { user };
};

export default getPreloadedState;
