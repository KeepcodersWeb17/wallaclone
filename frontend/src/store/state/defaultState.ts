import type State from "./types";

const defaultState: State = {
  user: {
    id: "",
    username: "",
  },
  adverts: {
    data: [],
    loaded: false,
  },
};

export default defaultState;
