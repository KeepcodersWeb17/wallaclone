import type State from "../state/types";

export const getIsLogged = (state: State) => !!state.user;

export const getUser = (state: State) => state.user;

export const getAdverts = (state: State) => state.adverts.list;

export const getAdvertsQuantity = (state: State) => state.adverts.quantity;

export const getAdvert = (advertId: string) => (state: State) =>
  state.adverts.list.find((advert) => advert.id === advertId);

export const getTags = (state: State) => state.tags.list;

export const getUi = (state: State) => state.ui;

export const getState = (state: State) => state;
