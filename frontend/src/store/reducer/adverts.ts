import type Action from "../actions/types";
import defaultState from "../state/defaultState";

const adverts = (state = defaultState.adverts, action: Action) => {
  switch (action.type) {
    case "ADVERT_CREATED_FULFILLED": {
      return {
        ...state,
        data: [...state, action.payload],
      };
    }

    default: {
      return state;
    }
  }
};

export default adverts;
