import { Advert } from "../state/types";

type AuthLoginFulfilled = {
  type: "AUTH_LOGIN_FULFILLED";
  payload: {
    id: string;
    username: string;
  };
};

type AuthLogoutFulfilled = {
  type: "AUTH_LOGOUT_FULFILLED";
};

type GetAdvertsFulfilled = {
  type: "GET_ADVERTS_FULFILLED";
  payload: Advert[];
};

type GetTagsFulfilled = {
  type: "GET_TAGS_FULFILLED";
  payload: string[];
};

type Action =
  | AuthLoginFulfilled
  | AuthLogoutFulfilled
  | GetAdvertsFulfilled
  | GetTagsFulfilled;

export default Action;
