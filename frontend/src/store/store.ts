import * as thunk from "redux-thunk";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import type State from "./state/types";
import auth from "./reducer/auth";
import user from "./reducer/user";

const configureStore = (preloadedState: Partial<State>) => {
  const rootReducer = combineReducers({ auth, user });
  const store = createStore(
    rootReducer,
    //@ts-expect-error lo vamos a tipar más adelante
    preloadedState,
    applyMiddleware(thunk.thunk)
  );

  return store;
};

export default configureStore;
