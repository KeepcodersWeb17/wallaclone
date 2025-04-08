import Action from "../actions/types";
import defaultState from "../state/defaultState";

const adverts = (state = defaultState.adverts, action: Action) => {
  switch (action.type) {
    case "ADVERT_CREATED_FULFILLED": {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    default:
      break;
  }
};

export default adverts;
