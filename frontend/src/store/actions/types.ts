import type { Advert, Tag, User } from "../state/types";

type UserLoginFulfilled = {
  type: "USER_LOGIN_FULFILLED";
  payload: User;
};

type UserLogoutFulfilled = {
  type: "USER_LOGOUT_FULFILLED";
};

type AdvertsFulfilled = {
  type: "ADVERTS_FULFILLED";
  payload: { list: Advert[]; quantity: number };
};

type TagsFulfilled = {
  type: "TAGS_FULFILLED";
  payload: Tag[];
};

type UiPending = {
  type: "UI_PENDING";
};

type UiFulfilled = {
  type: "UI_FULFILLED";
};

type UiRejected = {
  type: "UI_REJECTED";
  payload: string[];
};

type Action =
  | UserLoginFulfilled
  | UserLogoutFulfilled
  | AdvertsFulfilled
  | TagsFulfilled
  | UiPending
  | UiFulfilled
  | UiRejected;

export default Action;
