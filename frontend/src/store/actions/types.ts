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

type Advert = {
  name: string;
  price: number;
  tags: string[];
  image: string;
  owner: string;
  description: string;
};

type CreateAdvert = {
  type: "CREATE_ADVERT";
  payload: Advert;
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

type Action =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogoutPending
  | AuthLogoutFulfilled
  | AuthLogoutRejected
  | CreateAdvert
  | CreateAdvertPending
  | CreateAdvertFulfilled
  | CreateAdvertRejected;

export default Action;
