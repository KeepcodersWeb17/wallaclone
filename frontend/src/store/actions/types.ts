import { Advert, User } from "../state/types";

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

type CreateUserPending = {
  type: "CREATE_USER_PENDING";
};

type CreateUserFulfilled = {
  type: "CREATE_USER_FULFILLED";
  payload: User;
};

type CreateUserRejected = {
  type: "CREATE_USER_REJECTED";
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

type GetAdvertPending = {
  type: "GET_ADVERT_PENDING";
};

type GetAdvertFulfilled = {
  type: "GET_ADVERT_FULFILLED";
  payload: Advert;
};

type GetAdvertRejected = {
  type: "GET_ADVERT_REJECTED";
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

type UpdateAdvertPending = {
  type: "UPDATE_ADVERT_PENDING";
};

type UpdateAdvertFulfilled = {
  type: "UPDATE_ADVERT_FULFILLED";
  payload: Advert;
};

type UpdateAdvertRejected = {
  type: "UPDATE_ADVERT_REJECTED";
  payload: string;
};

type Action =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogoutPending
  | AuthLogoutFulfilled
  | AuthLogoutRejected
  | CreateUserPending
  | CreateUserFulfilled
  | CreateUserRejected
  | GetAdvertsPending
  | GetAdvertsFulfilled
  | GetAdvertsRejected
  | GetAdvertPending
  | GetAdvertFulfilled
  | GetAdvertRejected
  | CreateAdvertPending
  | CreateAdvertFulfilled
  | CreateAdvertRejected
  | UpdateAdvertPending
  | UpdateAdvertFulfilled
  | UpdateAdvertRejected;

export default Action;
