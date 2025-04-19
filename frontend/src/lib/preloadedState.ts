const getUser = async () => {
  const response = await fetch("http://localhost:4000/users", {
    credentials: "include"
  }).then((res) => res.json());

  if (response.error) return null;

  return response.user;
};

const getPreloadedState = async () => {
  const user = await getUser();

  return { user };
};

export default getPreloadedState;
