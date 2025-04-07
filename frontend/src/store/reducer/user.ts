import Action from "../actions/types";
import defaultState from "../state/defaultState";

const user = (state = defaultState, action: Action) => {
  switch (action.type) {
    case "AUTH_LOGIN_FULFILLED": {
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
      };
    }
    case "AUTH_LOGOUT_FULFILLED": {
      return {
        ...state,
        id: "",
        username: "",
      };
    }
    default: {
      return state;
    }
  }
};

export default user;
