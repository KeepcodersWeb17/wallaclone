import type { User, Advert } from "../state/types";
import {
  create as createAdvertAPI,
  getById,
  getLatest,
  update as updateAdvertAPI,
  remove as deleteAdvertAPI,
  toogleFavorite as toogleFavoriteAPI
} from "../services/adverts";
import {
  login,
  logout,
  create as createUserAPI,
  remove as deleteUserAPI
} from "../services/users";
import { getAll as getAllTagsAPI } from "../services/tags";

export const authLoginPending = () => ({
  type: "AUTH_LOGIN_PENDING"
});

export const authLoginFulfilled = (userData: User) => ({
  type: "AUTH_LOGIN_FULFILLED",
  payload: {
    id: userData.id,
    username: userData.username
  }
});

export const authLoginRejected = (error: string) => ({
  type: "AUTH_LOGIN_REJECTED",
  payload: error
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
  type: "AUTH_LOGOUT_PENDING"
});

export const authLogoutFulfilled = () => ({
  type: "AUTH_LOGOUT_FULFILLED"
});

export const authLogoutRejected = (error: string) => ({
  type: "AUTH_LOGOUT_REJECTED",
  payload: error
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
  type: "CREATE_USER_PENDING"
});

export const createUserFulfilled = (createdUser: User) => ({
  type: "CREATE_USER_FULFILLED",
  payload: createdUser
});

export const createUserRejected = (error: string) => ({
  type: "CREATE_USER_REJECTED",
  payload: error
});

export const createUser = (userData: User) => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      //dispatch(createUserPending());
      const { username, password } = userData;
      await createUserAPI(userData);
      dispatch(authLogin({ username, password }));
    } catch (error) {
      // dispatch(createUserRejected(error.message));
      console.error(error);
    }
  };
};

export const deleteUser = () => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      await deleteUserAPI();
      dispatch(authLogout());
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAdvertsPending = () => ({
  type: "GET_ADVERTS_PENDING"
});

export const getAdvertsFulfilled = (adverts: Advert[]) => ({
  type: "GET_ADVERTS_FULFILLED",
  payload: adverts
});

export const getAdvertsRejected = (error: string) => ({
  type: "GET_ADVERTS_REJECTED",
  payload: error
});

export const getAdverts = (queryString: string) => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      const adverts = await getLatest(queryString);
      dispatch(getAdvertsFulfilled(adverts));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAdvertPending = () => ({
  type: "GET_ADVERT_PENDING"
});

export const getAdvertFulfilled = (advert: Advert) => ({
  type: "GET_ADVERT_FULFILLED",
  payload: advert
});

export const getAdvertRejected = (error: string) => ({
  type: "GET_ADVERT_REJECTED",
  payload: error
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
  type: "ADVERT_CREATED_PENDING"
});

export const createAdvertFulfilled = () => ({
  type: "ADVERT_CREATED_FULFILLED"
});

export const createAdvertRejected = (error: string) => ({
  type: "ADVERT_CREATED_REJECTED",
  payload: error
});

export const createAdvert = (advert: Advert) => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      await createAdvertAPI(advert);
      dispatch(createAdvertFulfilled()); // TODO:mejor dispatch successNotification
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateAdvertPending = () => ({
  type: "UPDATE_ADVERT_PENDING"
});

export const updateAdvertFulfilled = () => ({
  type: "UPDATE_ADVERT_FULFILLED"
});

export const updateAdvertRejected = (error: string) => ({
  type: "UPDATE_ADVERT_REJECTED",
  payload: error
});

export const updateAdvert = (advert: Advert) => {
  // @ts-expect-error lo tipamos luego
  return async function (dispatch) {
    try {
      await updateAdvertAPI(advert);
      dispatch(updateAdvertFulfilled());
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteAdvertPending = () => ({
  type: "DELETE_ADVERT_PENDING"
});

export const deleteAdvertFulfilled = () => ({
  type: "DELETE_ADVERT_FULFILLED"
});

export const deleteAdvertRejected = (error: string) => ({
  type: "DELETE_ADVERT_REJECTED",
  payload: error
});

export const deleteAdvert = (advertId: string) => {
  // @ts-expect-error lo vamos a tipar mas adelante
  return async function (dispatch) {
    try {
      await deleteAdvertAPI(advertId);
      dispatch(deleteAdvertFulfilled());
    } catch (error) {
      console.error(error);
    }
  };
};

export const toogleFavoritePending = () => ({
  type: "TOOGLE_FAVORITE_PENDING"
});

export const toogleFavoriteFullfilled = () => ({
  type: "TOOGLE_FAVORITE_FULFILLED"
});

export const toogleFavoriteRejected = (error: string) => ({
  type: "TOOGLE_FAVORITE_REJECTED",
  payload: error
});

export const toogleFavorite = (isFavorite: boolean, advertId: string) => {
  // @ts-expect-error lo vamos a tipar mas adelante
  return async function (dispatch) {
    try {
      await toogleFavoriteAPI(isFavorite, advertId);
      dispatch(toogleFavoriteFullfilled());
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllTagsPending = () => ({
  type: "GET_TAGS_PENDING"
});

export const getAllTagsFulfilled = (tags: string[]) => ({
  type: "GET_TAGS_FULFILLED",
  payload: tags
});

export const getAllTagsRejected = (error: string) => ({
  type: "GET_TAGS_REJECTED",
  payload: error
});

export const getAllTags = () => {
  // @ts-expect-error lo vamos a tipar mas adelante
  return async function (dispatch) {
    try {
      const tags = await getAllTagsAPI();
      dispatch(getAllTagsFulfilled(tags));
    } catch (error) {
      console.error(error);
    }
  };
};
