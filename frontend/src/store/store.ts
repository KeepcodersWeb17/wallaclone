import * as thunk from "redux-thunk";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers
} from "redux";
import type State from "./state/types";
import user from "./reducer/user";
import adverts from "./reducer/adverts";
import tags from "./reducer/tags";

const configureStore = (preloadedState: Partial<State>) => {
  const rootReducer = combineReducers({ user, adverts, tags });
  const store = createStore(
    rootReducer,
    //@ts-expect-error lo vamos a tipar más adelante
    preloadedState,
    applyMiddleware(thunk.thunk)
  );

  return store;
};

export default configureStore;
