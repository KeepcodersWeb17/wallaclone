import type Action from "../actions/types";
import defaultState from "../state/defaultState";

const ui = (state = defaultState.ui, action: Action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default ui;
