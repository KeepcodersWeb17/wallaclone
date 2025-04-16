import type State from "./types";

const defaultState: State = {
  user: null,
  adverts: [],
  advert: null, // TODO eliminar propiedad "advert", usar la propiedad de "adverts"
  tags: []
};

export default defaultState;
