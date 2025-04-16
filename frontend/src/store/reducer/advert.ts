import Action from "../actions/types";
import defaultState from "../state/defaultState";

const advert = (state = defaultState.advert, action: Action) => {
  switch (action.type) {
    case "GET_ADVERT_FULFILLED": {
      return action.payload;
    }
    case "DELETE_ADVERT_FULFILLED": {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default advert;
