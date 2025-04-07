type AuthLoginPending = {
  type: "AUTH_LOGIN_PENDING";
};

type AuthLoginFulfilled = {
  type: "AUTH_LOGIN_FULFILLED";
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

type Action =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogoutPending
  | AuthLogoutFulfilled
  | AuthLogoutRejected;

export default Action;
