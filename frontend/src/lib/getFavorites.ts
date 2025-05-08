import { Advert, User } from "../store/state/types";

export const getFavorites = async (
  setFavorites: (prevState: Advert[]) => void,
  user: User
) => {
  try {
    const response = await fetch(
      `https://api.wallaclone.keepcoders.duckdns.org/adverts?favorites=${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching liked adverts");
    }

    const data = await response.json();

    const adverts: Advert[] = data.adverts.map((advert: Advert) => {
      if (!advert.image) {
        advert.image =
          "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";
      }
      return advert;
    });

    setFavorites(adverts);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Error fetching liked adverts:", error);
  }
};
