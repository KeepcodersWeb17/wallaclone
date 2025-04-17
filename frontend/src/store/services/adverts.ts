import type { Advert } from "../state/types";

export const create = async (advert: Advert) => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/adverts",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(advert)
    }
  );

  if (!response.ok) {
    throw new Error("Error al crear el anuncio");
  }
};

export const getLatest = async (queryString: string) => {
  const response = await fetch(
    `https://api.wallaclone.keepcoders.duckdns.org/adverts?${queryString}`,
    {
      credentials: "include"
    }
  ).then((res) => res.json());

  if (response.error) {
    if (typeof response.error === "string") {
      throw new Error(response.error);
    }
    const errors: { field: string; message: string }[] = response.error;
    const errorMessages = errors.map((error) => error.message).join("---");
    throw new Error(errorMessages);
  }

  const adverts: Advert[] = response.adverts.map((advert: Advert) => {
    if (!advert.image) {
      advert.image =
        "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";
    }
    return advert;
  });
  return { list: adverts, quantity: response.quantity as number };
};

export const getById = async (advertId: string) => {
  const response = await fetch(
    `https://api.wallaclone.keepcoders.duckdns.org/adverts/${advertId}`,
    {
      credentials: "include"
    }
  ).then((res) => res.json());

  if (response.error) {
    if (typeof response.error === "string") {
      throw new Error(response.error);
    }
    const errors: { field: string; message: string }[] = response.error;
    const errorMessages = errors.map((error) => error.message).join("---");
    throw new Error(errorMessages);
  }

  const advert: Advert = response.advert;
  if (!advert.image) {
    advert.image =
      "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";
  }

  return { list: [advert], quantity: 1 };
};

export const update = async (advert: Advert) => {
  const response = await fetch(
    `https://api.wallaclone.keepcoders.duckdns.org/adverts/${advert.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(advert)
    }
  ).then((res) => res.json());

  if (response.error) {
    if (typeof response.error === "string") {
      throw new Error(response.error);
    }
    const errors: { field: string; message: string }[] = response.error;
    const errorMessages = errors.map((error) => error.message).join("---");
    throw new Error(errorMessages);
  }
};

export const remove = async (advertId: string) => {
  const response = await fetch(
    `https://api.wallaclone.keepcoders.duckdns.org/adverts/${advertId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ advertId })
    }
  ).then((res) => res.json());

  if (response.error) {
    if (typeof response.error === "string") {
      throw new Error(response.error);
    }
    const errors: { field: string; message: string }[] = response.error;
    const errorMessages = errors.map((error) => error.message).join("---");
    throw new Error(errorMessages);
  }
};

export const toogleFavorite = async (isFavorite: boolean, advertId: string) => {
  const response = await fetch(
    `https://api.wallaclone.keepcoders.duckdns.org/adverts/${advertId}/favorite`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ isFavorite })
    }
  ).then((res) => res.json());

  if (response.error) {
    if (typeof response.error === "string") {
      throw new Error(response.error);
    }
    const errors: { field: string; message: string }[] = response.error;
    const errorMessages = errors.map((error) => error.message).join("---");
    throw new Error(errorMessages);
  }
};
