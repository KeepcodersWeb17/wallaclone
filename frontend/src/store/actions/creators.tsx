import type { Credentials } from "../services/auth";
import { create } from "../services/adverts";
import { login, logout } from "../services/auth";
import { Advert } from "../state/types";

export const authLoginPending = () => ({
  type: "AUTH_LOGIN_PENDING",
});

// @ts-expect-error Lo vamos a tipar más adelante
export const authLoginFulfilled = (userData) => ({
  type: "AUTH_LOGIN_FULFILLED",
  payload: {
    id: userData.id,
    username: userData.username,
  },
});

export const authLoginRejected = (error: string) => ({
  type: "AUTH_LOGIN_REJECTED",
  payload: error,
});

export const authLogin = (
  credentials: Credentials
  // @ts-expect-error Lo vamos a tipar más adelante
): AppThunk<Promise<void>> => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      const { id, username } = await login(credentials);
      dispatch(authLoginFulfilled({ id, username }));
    } catch (error) {
      console.error(error);
    }
  };
};

export const authLogoutPending = () => ({
  type: "AUTH_LOGOUT_PENDING",
});

export const authLogoutFulfilled = () => ({
  type: "AUTH_LOGOUT_FULFILLED",
});

export const authLogoutRejected = (error: string) => ({
  type: "AUTH_LOGOUT_REJECTED",
  payload: error,
});

// @ts-expect-error Lo vamos a tipar más adelante
export const authLogout = (): AppThunk<Promise<void>> => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      await logout();
      dispatch(authLogoutFulfilled());
    } catch (error) {
      console.error(error);
    }
  };
};

// @ts-expect-error Lo vamos a tipar más adelante
export const signup = (userData) => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      const response = await fetch(
        "https://api.wallaclone.keepcoders.duckdns.org/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el usuario");
      }

      dispatch(authLogin(userData));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createAdvertPending = () => ({
  type: "ADVERT_CREATED_PENDING",
});

// @ts-expect-error Lo vamos a tipar más adelante
export const createAdvertFulfilled = (createdAdvert) => ({
  type: "ADVERT_CREATED_FULFILLED",
  payload: createdAdvert,
});

export const createAdvertRejected = (error: string) => ({
  type: "ADVERT_CREATED_REJECTED",
  payload: error,
});

export const createAdvert = (advert: Advert) => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      const createdAdvert = await create(advert);
      dispatch(createAdvertFulfilled(createdAdvert));
    } catch (error) {
      console.error(error);
    }
  };
};
