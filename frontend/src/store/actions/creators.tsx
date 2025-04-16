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

// export const actionPending = () => ({
//   type: "ACTION_PENDING"
// });

// export const actionRejected = (error: string) => ({
//   type: "ACTION_REJECTED",
//   payload: error
// });

const authLoginFulfilled = (userData: User) => ({
  type: "AUTH_LOGIN_FULFILLED",
  payload: {
    id: userData.id,
    username: userData.username
  }
});

const authLogoutFulfilled = () => ({
  type: "AUTH_LOGOUT_FULFILLED"
});

const getAdvertsFulfilled = (adverts: Advert[]) => ({
  type: "GET_ADVERTS_FULFILLED",
  payload: adverts
});

const getAllTagsFulfilled = (tags: string[]) => ({
  type: "GET_TAGS_FULFILLED",
  payload: tags
});

export const authLogin = (userData: User) => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      // dispatch(actionPending());
      const { id, username } = await login(userData);
      dispatch(authLoginFulfilled({ id, username }));
    } catch (error) {
      // dispatch(actionRejected(error.message));
      console.error(error);
    }
  };
};

export const createUser = (userData: User) => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      // dispatch(actionPending());
      const { username, password } = userData;
      await createUserAPI(userData);
      dispatch(authLogin({ username, password }));
    } catch (error) {
      // dispatch(actionRejected(error.message));
      console.error(error);
    }
  };
};

export const authLogout = () => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      // dispatch(actionPending());
      await logout();
      dispatch(authLogoutFulfilled());
    } catch (error) {
      // dispatch(actionRejected(error.message));
      console.error(error);
    }
  };
};

export const deleteUser = () => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      // dispatch(actionPending());
      await deleteUserAPI();
      dispatch(authLogout());
    } catch (error) {
      // dispatch(actionRejected(error.message));
      console.error(error);
    }
  };
};

export const getAdverts = (queryString: string) => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      // dispatch(actionPending());
      const adverts = await getLatest(queryString);
      dispatch(getAdvertsFulfilled(adverts));
    } catch (error) {
      // dispatch(actionRejected(error.message));
      console.error(error);
    }
  };
};

export const getAdvert = (advertId: string) => {
  // @ts-expect-error Lo vamos a tipar más adelante
  return async function (dispatch) {
    try {
      // dispatch(actionPending());
      const advert = await getById(advertId);
      dispatch(getAdvertsFulfilled([advert]));
    } catch (error) {
      // dispatch(actionRejected(error.message));
      console.error(error);
    }
  };
};

export const createAdvert = (advert: Advert) => {
  return async function () {
    try {
      // dispatch(actionPending());
      await createAdvertAPI(advert);
    } catch (error) {
      // dispatch(actionRejected(error.message));
      console.error(error);
    }
  };
};

export const updateAdvert = (advert: Advert) => {
  return async function () {
    try {
      // dispatch(actionPending());
      await updateAdvertAPI(advert);
    } catch (error) {
      // dispatch(actionRejected(error.message));
      console.error(error);
    }
  };
};

export const deleteAdvert = (advertId: string) => {
  return async function () {
    try {
      // dispatch(actionPending());
      await deleteAdvertAPI(advertId);
    } catch (error) {
      // dispatch(actionRejected(error.message));
      console.error(error);
    }
  };
};

export const toogleFavorite = (isFavorite: boolean, advertId: string) => {
  return async function () {
    try {
      // dispatch(actionPending());
      await toogleFavoriteAPI(isFavorite, advertId);
    } catch (error) {
      // dispatch(actionRejected(error.message));
      console.error(error);
    }
  };
};

export const getAllTags = () => {
  // @ts-expect-error lo vamos a tipar mas adelante
  return async function (dispatch) {
    try {
      // dispatch(actionPending());
      const tags = await getAllTagsAPI();
      dispatch(getAllTagsFulfilled(tags));
    } catch (error) {
      // dispatch(actionRejected(error.message));
      console.error(error);
    }
  };
};
