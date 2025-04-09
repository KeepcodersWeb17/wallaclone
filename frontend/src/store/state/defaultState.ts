import type State from "./types";

const defaultState: State = {
  user: {
    id: "",
    username: "",
  },
  adverts: [],
  advert: undefined,
};

export default defaultState;
