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

const getAdverts = async () => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/adverts",
    {
      credentials: "include",
    }
  ).then((res) => res.json());

  const adverts = [];

  if (!response.error) {
    adverts.push(...response.adverts);
  }

  return adverts;
};

const getPreloadedState = async () => {
  const user = await getUser();
  const adverts = await getAdverts();

  return { user, adverts };
};

export default getPreloadedState;
