import type State from "./types";

const defaultState: State = {
  user: null,
  adverts: { list: [], quantity: 0 },
  tags: []
};

export default defaultState;
