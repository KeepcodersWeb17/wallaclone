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
    throw new Error(response.error);
  }

  const adverts = response.adverts.map((advert: Advert) => {
    if (!advert.image) {
      advert.image =
        "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";
    }
    return advert;
  });

  return adverts;
};

export const getById = async (advertId: string) => {
  const response = await fetch(
    `https://api.wallaclone.keepcoders.duckdns.org/adverts/${advertId}`,
    {
      credentials: "include"
    }
  ).then((res) => res.json());

  if (response.error) {
    throw new Error(response.error);
  }

  const advert = response.advert;
  if (!advert.image) {
    advert.image =
      "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";
  }

  return advert;
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
    // @ts-expect-error lo vamos a tipar mas adelante
    const error = response.error.map((err) => err.message).join(", ");
    throw new Error(error);
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
    throw new Error(response.error);
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
    throw new Error(response.error);
  }
};
