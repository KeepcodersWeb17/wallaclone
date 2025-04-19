import type Action from "../actions/types";
import defaultState from "../state/defaultState";

const tags = (state = defaultState.tags, action: Action) => {
  switch (action.type) {
    case "TAGS_FULFILLED": {
      return {
        list: action.payload,
        loaded: true
      };
    }

    default: {
      return state;
    }
  }
};

export default tags;
