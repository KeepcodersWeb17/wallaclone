import type { Advert, Tag, User } from "../state/types";

type AuthLoginFulfilled = {
  type: "AUTH_LOGIN_FULFILLED";
  payload: User;
};

type AuthLogoutFulfilled = {
  type: "AUTH_LOGOUT_FULFILLED";
};

type GetAdvertsFulfilled = {
  type: "GET_ADVERTS_FULFILLED";
  payload: { list: Advert[]; quantity: number };
};

type GetTagsFulfilled = {
  type: "GET_TAGS_FULFILLED";
  payload: Tag[];
};

export type ActionPending = {
  type: "ACTION_PENDING";
};

type ActionRejected = {
  type: "ACTION_REJECTED";
  payload: string[];
};

type Action =
  | AuthLoginFulfilled
  | AuthLogoutFulfilled
  | GetAdvertsFulfilled
  | GetTagsFulfilled
  | ActionPending
  | ActionRejected;

export default Action;
