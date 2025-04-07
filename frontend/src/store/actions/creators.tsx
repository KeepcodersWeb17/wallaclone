import { login, logout } from "../services/auth";
import type { Credentials } from "../services/auth";

export const AuthLoginPending = () => ({
  type: "AUTH_LOGIN_PENDING",
});

export const AuthLoginFulfilled = () => ({
  type: "AUTH_LOGIN_FULFILLED",
});

export const AuthLoginRejected = (error: string) => ({
  type: "AUTH_LOGIN_REJECTED",
  payload: error,
});

export const AuthLogoutPending = () => ({
  type: "AUTH_LOGOUT_PENDING",
});

export const AuthLogoutFulfilled = () => ({
  type: "AUTH_LOGOUT_FULFILLED",
});

export const AuthLogoutRejected = (error: string) => ({
  type: "AUTH_LOGOUT_REJECTED",
  payload: error,
});

// @ts-expect-error Lo vamos a tipar más adelante
export const AuthLogout = (): AppThunk<Promise<void>> => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      await logout();
      dispatch(AuthLogoutFulfilled());
    } catch (error) {
      console.error(error);
    }
  };
};

export const AuthLogin = (
  credentials: Credentials
  // @ts-expect-error Lo vamos a tipar más adelante
): AppThunk<Promise<void>> => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      await login(credentials);
      dispatch(AuthLoginFulfilled());
    } catch (error) {
      console.error(error);
    }
  };
};
