import type Action from "../actions/types";
import defaultState from "../state/defaultState";

const auth = (state = defaultState, action: Action) => {
  switch (action.type) {
    case "AUTH_LOGIN_FULFILLED": {
      return { ...state, auth: true };
    }
    case "AUTH_LOGOUT_FULFILLED": {
      return { ...state, auth: false };
    }
    default: {
      return state;
    }
  }
};

export default auth;
