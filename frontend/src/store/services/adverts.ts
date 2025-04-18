import { handleFetchError } from "../../lib/handleFetchError";
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
  );

  const data = await response.json();

  if (!response.ok) {
    const error = handleFetchError(data);

    throw new Error(error);
  }

  const adverts: Advert[] = data.adverts.map((advert: Advert) => {
    if (!advert.image) {
      advert.image =
        "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";
    }
    return advert;
  });

  return { list: adverts, quantity: data.quantity as number };
};

export const getById = async (advertId: string) => {
  const response = await fetch(
    `https://api.wallaclone.keepcoders.duckdns.org/adverts/${advertId}`,
    {
      credentials: "include"
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = handleFetchError(data);

    throw new Error(error);
  }

  const advert: Advert = data.advert;
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
  );

  if (!response.ok) {
    const data = await response.json();

    const error = handleFetchError(data);

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
  );

  if (!response.ok) {
    const data = await response.json();

    const error = handleFetchError(data);

    throw new Error(error);
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
  );

  if (!response.ok) {
    const data = await response.json();

    const error = handleFetchError(data);

    throw new Error(error);
  }
};
