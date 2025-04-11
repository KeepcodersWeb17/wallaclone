import type { Advert } from "../state/types";

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

  const { _id, name, description, price, image, tags, owner, sale } =
    await response.json();

  return { id: _id, name, description, price, image, tags, owner, sale };
};

export const getLatest = async () => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/adverts",
    {
      credentials: "include",
    }
  ).then((res) => res.json());

  const adverts = [];

  if (!response.error) {
    adverts.push(
      ...response.adverts.map((advert: Advert) => ({
        ...advert,
        id: advert._id,
      }))
    );
  }

  return adverts;
};

export const getById = async (advertId: string) => {
  const response = await fetch(
    `https://api.wallaclone.keepcoders.duckdns.org/adverts/${advertId}`,
    {
      credentials: "include",
    }
  ).then((res) => res.json());

  if (response.error) {
    throw new Error(response.error);
  }

  return response;
};

export const update = async (advert: Advert) => {
  const response = await fetch(
    `https://api.wallaclone.keepcoders.duckdns.org/adverts/${advert.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(advert),
    }
  ).then((res) => res.json());

  if (response.error) {
    if (typeof response.error === "string") {
      throw new Error(response.error);
    }
    // @ts-expect-error lo vamos a tipar mas adelante
    const error = response.error.map((err) => err.message).join(", ");
    throw new Error(error);
  }

  const { _id, name, description, price, image, tags, owner, sale } = response;

  return { id: _id, name, description, price, image, tags, owner, sale };
};
