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

type AuthLogout = {
  type: "AUTH_LOGOUT";
};
type Action =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout;

export default Action;
