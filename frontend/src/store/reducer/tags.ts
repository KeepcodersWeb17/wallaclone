import type Action from "../actions/types";
import defaultState from "../state/defaultState";

const tags = (state = defaultState.tags, action: Action) => {
  switch (action.type) {
    case "GET_TAGS_FULFILLED": {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

export default tags;
