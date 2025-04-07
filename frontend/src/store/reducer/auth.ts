import type Action from "../actions/types";
import defaultState from "../state/defaultState";

const auth = (state = defaultState.auth, action: Action) => {
  switch (action.type) {
    case "AUTH_LOGIN_FULFILLED": {
      return true;
    }
    case "AUTH_LOGOUT_FULFILLED": {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default auth;
