import type Action from "../actions/types";
import defaultState from "../state/defaultState";

const user = (state = defaultState.user, action: Action) => {
  switch (action.type) {
    case "USER_LOGIN_FULFILLED": {
      return action.payload;
    }
    case "USER_LOGOUT_FULFILLED": {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default user;
