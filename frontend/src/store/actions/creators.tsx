import type { User, Advert } from "../state/types";
import {
  create as createAdvertAPI,
  getById,
  getLatest,
  update as updateAdvertAPI,
  remove as deleteAdvertAPI,
} from "../services/adverts";
import { login, logout, create as createUserAPI } from "../services/users";

export const authLoginPending = () => ({
  type: "AUTH_LOGIN_PENDING",
});

export const authLoginFulfilled = (userData: User) => ({
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

export const authLogin = (userData: User) => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      const { id, username } = await login(userData);
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

export const authLogout = () => {
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

export const createUserPending = () => ({
  type: "CREATE_USER_PENDING",
});

export const createUserFulfilled = (createdUser: User) => ({
  type: "CREATE_USER_FULFILLED",
  payload: createdUser,
});

export const createUserRejected = (error: string) => ({
  type: "CREATE_USER_REJECTED",
  payload: error,
});

export const createUser = (userData: User) => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      const { username, password } = userData;
      await createUserAPI(userData);
      dispatch(authLogin({ username, password }));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAdvertsPending = () => ({
  type: "GET_ADVERTS_PENDING",
});

export const getAdvertsFulfilled = (adverts: Advert[]) => ({
  type: "GET_ADVERTS_FULFILLED",
  payload: adverts,
});

export const getAdvertsRejected = (error: string) => ({
  type: "GET_ADVERTS_REJECTED",
  payload: error,
});

export const getAdverts = () => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      const adverts = await getLatest();
      dispatch(getAdvertsFulfilled(adverts));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAdvertPending = () => ({
  type: "GET_ADVERT_PENDING",
});

export const getAdvertFulfilled = (advert: Advert) => ({
  type: "GET_ADVERT_FULFILLED",
  payload: advert,
});

export const getAdvertRejected = (error: string) => ({
  type: "GET_ADVERT_REJECTED",
  payload: error,
});

export const getAdvert = (advertId: string) => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      const advert = await getById(advertId);
      dispatch(getAdvertFulfilled(advert));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createAdvertPending = () => ({
  type: "ADVERT_CREATED_PENDING",
});

export const createAdvertFulfilled = (createdAdvert: Advert) => ({
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
      const createdAdvert = await createAdvertAPI(advert);
      dispatch(createAdvertFulfilled(createdAdvert));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateAdvertPending = () => ({
  type: "UPDATE_ADVERT_PENDING",
});

export const updateAdvertFulfilled = (updatedAdvert: Advert) => ({
  type: "UPDATE_ADVERT_FULFILLED",
  payload: updatedAdvert,
});

export const updateAdvertRejected = (error: string) => ({
  type: "UPDATE_ADVERT_REJECTED",
  payload: error,
});

export const updateAdvert = (advert: Advert) => {
  // @ts-expect-error lo tipamos luego
  return async function (dispatch) {
    try {
      const updatedAdvert = await updateAdvertAPI(advert);
      dispatch(updateAdvertFulfilled(updatedAdvert));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteAdvertPending = () => ({
  type: "DELETE_ADVERT_PENDING",
});

export const deleteAdvertFulfilled = (deletedAdvert: Advert) => ({
  type: "DELETE_ADVERT_FULFILLED",
  payload: deletedAdvert,
});

export const deleteAdvertRejected = (error: string) => ({
  type: "DELETE_ADVERT_REJECTED",
  payload: error,
});

export const deleteAdvert = (advertId: string) => {
  // @ts-expect-error lo vamos a tipar mas adelante
  return async function (dispatch) {
    try {
      const deletedAdvert = await deleteAdvertAPI(advertId);
      dispatch(deleteAdvertFulfilled(deletedAdvert));
    } catch (error) {
      console.error(error);
    }
  };
};
