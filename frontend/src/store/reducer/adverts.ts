import type Action from "../actions/types";
import defaultState from "../state/defaultState";

const adverts = (state = defaultState.adverts, action: Action) => {
  switch (action.type) {
    case "ADVERTS_FULFILLED": {
      return action.payload;
    }
    // TODO es la manera que se me ocurrio para poder actualizar el anuncio tanto desde el detalle del anuncio como dsde la home
    case "UPDATED_ADVERTS_FULFILLED": {
      const updatedAdvert = action.payload;
      const updatedAdverts = state.list.map((advert) =>
        advert.id === updatedAdvert.id ? updatedAdvert : advert
      );

      return {
        ...state,
        list: updatedAdverts,
        quantity: updatedAdverts.length
      };
    }

    default: {
      return state;
    }
  }
};

export default adverts;
