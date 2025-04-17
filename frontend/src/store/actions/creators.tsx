import type { Location, NavigateFunction } from "react-router-dom";
import type { User, Advert, Tag } from "../state/types";
import type { AppThunk } from "../store";
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

const uiPending = () => ({
  type: "UI_PENDING"
});

const uiFulfilled = () => ({
  type: "UI_FULFILLED"
});

const uiRejected = (error: string[]) => ({
  type: "UI_REJECTED",
  payload: error
});

const userLoginFulfilled = (userData: User) => ({
  type: "USER_LOGIN_FULFILLED",
  payload: userData
});

const userLogoutFulfilled = () => ({
  type: "USER_LOGOUT_FULFILLED"
});

const advertsFulfilled = (adverts: { list: Advert[]; quantity: number }) => ({
  type: "ADVERTS_FULFILLED",
  payload: adverts
});

const tagsFulfilled = (tags: Tag[]) => ({
  type: "TAGS_FULFILLED",
  payload: tags
});

export const authLogin = (
  userData: User,
  navigate?: NavigateFunction,
  location?: Location
): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      const user = await login(userData);
      dispatch(uiFulfilled());
      dispatch(userLoginFulfilled(user));
      if (navigate && location) {
        navigate(location.state?.from ?? "/adverts", { replace: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        const errors = error.message.split("---");
        dispatch(uiRejected(errors));
        return;
      }
      alert(error);
    }
  };
};

export const authLogout = (): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      await logout();
      dispatch(uiFulfilled());
      dispatch(userLogoutFulfilled());
    } catch (error) {
      if (error instanceof Error) {
        dispatch(uiRejected([error.message]));
        return;
      }
      alert(error);
    }
  };
};

export const createUser = (
  userData: User,
  navigate: NavigateFunction
): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      const { username, password } = userData;
      await createUserAPI(userData);
      dispatch(uiFulfilled());
      dispatch(authLogin({ username, password }));
      navigate("/adverts"); // TODO: el res.end() de la API esta afectando a la redireccion por como manejamos el fetch
    } catch (error) {
      if (error instanceof Error) {
        const errors = error.message.split("---");
        dispatch(uiRejected(errors));
        return;
      }
      alert(error); // TODO: Si las password no coinciden se ejecuta el Alert
    }
  };
};

export const deleteUser = (): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      await deleteUserAPI();
      dispatch(uiFulfilled());
      dispatch(authLogout());
    } catch (error) {
      if (error instanceof Error) {
        const errors = error.message.split("---");
        dispatch(uiRejected(errors));
        return;
      }
      alert(error);
    }
  };
};

export const getAdverts = (queryString: string): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      const adverts = await getLatest(queryString);
      dispatch(uiFulfilled());
      dispatch(advertsFulfilled(adverts));
    } catch (error) {
      if (error instanceof Error) {
        const errors = error.message.split("---");
        dispatch(uiRejected(errors));
        return;
      }
      alert(error);
    }
  };
};

export const getAdvert = (advertId: string): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      const adverts = await getById(advertId);
      dispatch(uiFulfilled());
      dispatch(advertsFulfilled(adverts));
    } catch (error) {
      if (error instanceof Error) {
        const errors = error.message.split("---");
        dispatch(uiRejected(errors));
        return;
      }
      alert(error);
    }
  };
};

export const createAdvert = (advert: Advert): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      await createAdvertAPI(advert);
      dispatch(uiFulfilled());
    } catch (error) {
      if (error instanceof Error) {
        const errors = error.message.split("---");
        dispatch(uiRejected(errors));
        return;
      }
      alert(error);
    }
  };
};

export const updateAdvert = (advert: Advert): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      await updateAdvertAPI(advert);
      dispatch(uiFulfilled());
    } catch (error) {
      if (error instanceof Error) {
        const errors = error.message.split("---");
        dispatch(uiRejected(errors));
        return;
      }
      alert(error);
    }
  };
};

export const deleteAdvert = (advertId: string): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      await deleteAdvertAPI(advertId);
      dispatch(uiFulfilled());
    } catch (error) {
      if (error instanceof Error) {
        const errors = error.message.split("---");
        dispatch(uiRejected(errors));
        return;
      }
      alert(error);
    }
  };
};

export const toogleFavorite = (
  isFavorite: boolean,
  advertId: string
): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      await toogleFavoriteAPI(isFavorite, advertId);
      dispatch(uiFulfilled());
      dispatch(getAdvert(advertId));
    } catch (error) {
      if (error instanceof Error) {
        const errors = error.message.split("---");
        dispatch(uiRejected(errors));
        return;
      }
      alert(error);
    }
  };
};

export const getAllTags = (): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      const tags = await getAllTagsAPI();
      dispatch(uiFulfilled());
      dispatch(tagsFulfilled(tags));
    } catch (error) {
      if (error instanceof Error) {
        const errors = error.message.split("---");
        dispatch(uiRejected(errors));
        return;
      }
      alert(error);
    }
  };
};
