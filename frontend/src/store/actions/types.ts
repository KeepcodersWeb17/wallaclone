import { Advert } from "../state/types";

type AuthLoginPending = {
  type: "AUTH_LOGIN_PENDING";
};

type AuthLoginFulfilled = {
  type: "AUTH_LOGIN_FULFILLED";
  payload: {
    id: string;
    username: string;
  };
};

type AuthLoginRejected = {
  type: "AUTH_LOGIN_REJECTED";
  payload: string;
};

type AuthLogoutPending = {
  type: "AUTH_LOGOUT_PENDING";
};

type AuthLogoutFulfilled = {
  type: "AUTH_LOGOUT_FULFILLED";
};

type AuthLogoutRejected = {
  type: "AUTH_LOGOUT_REJECTED";
  payload: string;
};

type GetAdvertsPending = {
  type: "GET_ADVERTS_PENDING";
};

type GetAdvertsFulfilled = {
  type: "GET_ADVERTS_FULFILLED";
  payload: Advert[];
};

type GetAdvertsRejected = {
  type: "GET_ADVERTS_REJECTED";
  payload: string;
};

type CreateAdvertPending = {
  type: "ADVERT_CREATED_PENDING";
};

type CreateAdvertFulfilled = {
  type: "ADVERT_CREATED_FULFILLED";
  payload: Advert;
};

type CreateAdvertRejected = {
  type: "ADVERT_CREATED_REJECTED";
  payload: string;
};

type Action =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogoutPending
  | AuthLogoutFulfilled
  | AuthLogoutRejected
  | GetAdvertsPending
  | GetAdvertsFulfilled
  | GetAdvertsRejected
  | CreateAdvertPending
  | CreateAdvertFulfilled
  | CreateAdvertRejected;

export default Action;
