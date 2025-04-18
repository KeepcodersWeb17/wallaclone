import type State from "./types";

const defaultState: State = {
  user: null,
  adverts: { list: [], quantity: 0 },
  tags: { list: [], loaded: false },
  ui: { loading: false, error: null }
};

export default defaultState;
