import type { Location, NavigateFunction } from "react-router-dom";
import type {
  User,
  Advert,
  Tag,
  UserLogin,
  UserSignup,
  AdvertCreate,
  AdvertUpdate,
  UserUpdate
} from "../state/types";
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
  remove as deleteUserAPI,
  update as updateUserAPI
} from "../services/users";
import { getAll as getAllTagsAPI } from "../services/tags";

const uiPending = () => ({
  type: "UI_PENDING"
});

const uiFulfilled = () => ({
  type: "UI_FULFILLED"
});

export const uiRejected = (error: string[]) => ({
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

const tagsFulfilled = (list: Tag[]) => ({
  type: "TAGS_FULFILLED",
  payload: list
});

export const authLogin = (
  userData: UserLogin,
  navigate: NavigateFunction,
  location: Location
): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      const user = await login(userData);
      dispatch(uiFulfilled());
      dispatch(userLoginFulfilled(user));
      navigate(location.state?.from || "/adverts", { replace: true });
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
  userData: UserSignup,
  navigate: NavigateFunction,
  location: Location
): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      const { username, password, confirmPassword } = userData;
      dispatch(uiPending());

      // check if password and confirm password are the same
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await createUserAPI(userData);
      dispatch(uiFulfilled());
      dispatch(authLogin({ username, password }, navigate, location));
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

export const updateUser = (
  userData: UserUpdate,
  navigate: NavigateFunction
): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      const { password, confirmPassword } = userData;
      dispatch(uiPending());

      // check if password and confirm password are the same
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const updatedUser = await updateUserAPI(userData);
      dispatch(uiFulfilled());
      dispatch(userLoginFulfilled(updatedUser));
      navigate(`/users/${updatedUser.username}`, { replace: true });
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

export const deleteUser = (
  navigate: NavigateFunction
): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      await deleteUserAPI();
      dispatch(uiFulfilled());
      dispatch(authLogout());
      navigate("/adverts", { replace: true });
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
        // esto es para que no se quede la lista de anuncios en el estado si hay un error
        dispatch(advertsFulfilled({ list: [], quantity: 0 }));
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

export const createAdvert = (
  advert: AdvertCreate,
  navigate: NavigateFunction
): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      const createdAdvert = await createAdvertAPI(advert);
      dispatch(uiFulfilled());
      navigate(`/adverts/${createdAdvert.name}-${createdAdvert.id}`);
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

export const updateAdvert = (
  advert: AdvertUpdate,
  advertId: string,
  navigate: NavigateFunction
): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      const updatedAdvert = await updateAdvertAPI(advert, advertId);
      dispatch(uiFulfilled());
      navigate(`/adverts/${updatedAdvert.name}-${updatedAdvert.id}`);
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

export const deleteAdvert = (
  advertId: string,
  navigate: NavigateFunction
): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(uiPending());
      await deleteAdvertAPI(advertId);
      dispatch(uiFulfilled());
      navigate("/adverts", { replace: true });
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

//TODO: logica que tenemos en el AdvertPage para marcar y desmarcar favoritos
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
  return async function (dispatch, getState) {
    try {
      const state = getState();
      const loaded = state.tags.loaded;
      if (loaded) return;
      dispatch(uiPending());
      const list = await getAllTagsAPI();
      dispatch(uiFulfilled());
      dispatch(tagsFulfilled(list));
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
