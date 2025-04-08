import { Advert } from "../state/types";

export const create = async (advert: Advert) => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/adverts",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(advert),
    }
  );

  if (!response.ok) {
    throw new Error("Error al crear el anuncio");
  }

  const { _id, name, description, price, image, tags, owner } =
    await response.json();

  return { id: _id, name, description, price, image, tags, owner };
};
