import type Action from "../actions/types";
import defaultState from "../state/defaultState";

const ui = (state = defaultState.ui, action: Action) => {
  switch (action.type) {
    case "UI_PENDING": {
      return { error: null, loading: true };
    }
    case "UI_FULFILLED": {
      return { error: null, loading: false };
    }
    case "UI_REJECTED": {
      return { error: action.payload, loading: false };
    }
    default: {
      return state;
    }
  }
};

export default ui;
