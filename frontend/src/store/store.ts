import * as thunk from "redux-thunk";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import type State from "./state/types";
import auth from "./reducer/auth";

const configureStore = (preloadedState: State) => {
  const rootReducer = auth;
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk.thunk)
  );

  return store;
};

export default configureStore;
