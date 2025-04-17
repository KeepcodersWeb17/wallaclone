import * as thunk from "redux-thunk";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers
} from "redux";
import { useDispatch, useSelector } from "react-redux";
import type State from "./state/types";
import type Action from "./actions/types";
import user from "./reducer/user";
import adverts from "./reducer/adverts";
import tags from "./reducer/tags";

const configureStore = (preloadedState: Partial<State>) => {
  const rootReducer = combineReducers({ user, adverts, tags });
  const store = createStore(
    rootReducer,
    preloadedState as never,
    applyMiddleware(thunk.withExtraArgument<State, Action>())
  );

  return store;
};

export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppGetState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export default configureStore;
