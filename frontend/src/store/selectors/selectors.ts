import type State from "../state/types";

export const getIsLogged = (state: State) => !!state.user;

export const getUser = (state: State) => state.user;

export const getAdverts = (state: State) => state.adverts.list;

export const getAdvertsQuantity = (state: State) => state.adverts.quantity;

export const getAdvert = (state: State) => state.adverts.list[0];

export const getTags = (state: State) => state.tags;

export const getUi = (state: State) => state.ui;

export const getState = (state: State) => state;
