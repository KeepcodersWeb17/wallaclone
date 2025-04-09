const getUser = async () => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/users",
    {
      credentials: "include",
    }
  ).then((res) => res.json());

  const user = {
    id: "",
    username: "",
  };

  if (!response.error) {
    user.id = response.user._id;
    user.username = response.user.username;
  }

  return user;
};

const getPreloadedState = async () => {
  const user = await getUser();

  return { user };
};

export default getPreloadedState;
