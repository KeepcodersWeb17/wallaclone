export const getAll = async () => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/tags",
    {
      credentials: "include"
    }
  ).then((res) => res.json());

  if (response.error) {
    throw new Error(response.error);
  }
  return response.tags;
};
