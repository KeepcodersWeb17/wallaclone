import type Action from "../actions/types";
import defaultState from "../state/defaultState";

const adverts = (state = defaultState.adverts, action: Action) => {
  switch (action.type) {
    case "ADVERTS_FULFILLED": {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

export default adverts;
