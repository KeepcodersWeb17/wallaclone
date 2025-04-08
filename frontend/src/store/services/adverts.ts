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

  const data = await response.json();

  console.log("Advert created:", data);

  if (!response.ok) {
    throw new Error("Error al crear el anuncio");
  }
};
